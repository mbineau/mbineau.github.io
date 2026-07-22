# portfolio-page
Portfolio Website with few things, including what I built

# Mega Roadmap — Platform Security par la construction

> **Philosophie : Construire cassé → Comprendre en attaquant → Sécuriser → Publier.**
> On ne lit pas pour comprendre Kube, une CI/CD ou une infra AWS. On la monte à la main, on se cogne, on la casse, on la répare, et on écrit ce qu'on a appris. Chaque projet doit d'abord te faire échouer. C'est le signe que tu apprends la bonne chose.

**Durée cible :** ~9–12 mois à rythme soutenable (5–8 h/semaine). Compressible si tu bourres.
**Sortie :** 4 projets publics qui racontent une histoire cohérente + 1 capstone qui les relie, le tout sur GitHub + write-ups.

---

## Règles du jeu (à relire quand tu galères)

1. **Zéro ClickOps.** Tout en code (Terraform, YAML, scripts). Si tu l'as fait à la main dans une console, ça ne compte pas — tu ne pourras pas le rejouer, donc tu ne l'as pas compris.
2. **Construis la version naïve d'abord.** Résiste à l'envie de sortir l'outil managé tout de suite. EKS avant d'avoir souffert sur les primitives K8s, c'est de la triche contre toi-même.
3. **Attaque ce que tu construis.** Tu es security engineer. Un guardrail que tu ne sais pas contourner est un guardrail que tu ne comprends pas.
4. **Un artefact public par projet.** Repo propre + README + write-up. Le portfolio n'est pas une phase finale, c'est un sous-produit de chaque étape.
5. **"Definition of Done" avant de passer à la suite.** Chaque projet a une checklist de fin. Tant qu'elle n'est pas verte, tu n'avances pas.
6. **Note tes échecs.** Un fichier `FAILURES.md` par projet où tu écris ce qui a cassé et pourquoi. C'est ton meilleur matériau de blog et ton meilleur souvenir de fierté plus tard.

---

## Phase 0 — Le labo & les primitives (Semaines 1–2)

**Mission :** monter l'atelier et démystifier ce que Kube va orchestrer, avant même de toucher à Kube.

### 0.1 — L'atelier
- [ ] Compte AWS dédié + **budget alarms + AWS Budgets** (pour échouer fort sans finir à découvert). Mets une limite dure mentale : ce que tu es prêt à cramer.
- [ ] Terraform installé, un backend state distant (S3 + DynamoDB lock) monté... en Terraform.
- [ ] Un repo GitHub "monorepo lab" + un blog minimal (un simple repo `blog` en markdown suffit pour commencer, tu embelliras après).
- [ ] `direnv`, un gestionnaire de secrets local (pas de creds en clair, jamais), `pre-commit` avec un scanner de secrets (gitleaks).

### 0.2 — Le container from scratch (l'exercice humiliant obligatoire)
- [ ] Construis un "container" à la main en bash/Go : `chroot`, `unshare` (namespaces PID/NET/MNT/UTS), `cgroups` pour limiter CPU/mémoire. Réf : la démo de Liz Rice "Building a container from scratch in Go".
- [ ] Lance un process dedans, isole-le, casse l'isolation exprès (partage un namespace, monte le host).
- **Pourquoi :** quand tu comprends qu'un container = process Linux + namespaces + cgroups, K8s cesse d'être magique et l'évasion de container devient évidente.

**Definition of Done Phase 0 :** tu as un `hostPath`-like escape que tu as reproduit à la main, et tu peux expliquer à voix haute ce qu'est un namespace.

---

## Phase 1 — AWS from zero, sécurisé par construction (Semaines 3–8)

**Mission :** monter une landing zone AWS propre entièrement en IaC, la casser, la durcir.

### 1.1 — La version naïve (échoue ici)
- [ ] Un VPC, des subnets, une EC2, un bucket S3, un rôle IAM — vite fait, "comme un dev pressé". Rends-le volontairement moche : S3 public, security group `0.0.0.0/0`, IAM `*:*`, pas de logs.
- [ ] Documente honnêtement tout ce qui est pourri.

### 1.2 — L'attaque (comprends)
- [ ] Fais tourner **CloudGoat** (Rhino Security Labs) et **flaws.cloud / flaws2.cloud** : tu apprends les chemins d'attaque cloud réels (privesc IAM, metadata SSRF, buckets ouverts, creds qui traînent).
- [ ] Rejoue une privesc IAM sur *ta* version naïve. Comprends la logique d'évaluation des policies (identity vs resource, deny explicite, boundaries).

### 1.3 — La landing zone sérieuse (sécurise — ton vrai métier)
- [ ] Multi-account via **AWS Organizations** + **SCPs** (interdire la désactivation de CloudTrail, forcer une région, etc.).
- [ ] **IAM Identity Center (SSO)**, plus aucun user IAM long-terme. Rôles + least privilege, **permission boundaries**.
- [ ] Réseau privé par défaut : subnets privés, pas d'IP publique gratuite, endpoints VPC, egress contrôlé.
- [ ] Détection : **CloudTrail** org-wide → bucket centralisé chiffré, **GuardDuty**, **AWS Config** avec règles, **Security Hub**.
- [ ] Secrets : Secrets Manager / SSM, chiffrement KMS partout, rotation.
- [ ] Scanne ta propre infra : **Prowler** + **Checkov/tfsec** en CI sur ton Terraform.

**Portfolio :** module Terraform "secure AWS baseline" open-source + write-up *"J'ai monté une landing zone AWS de zéro : ce que j'ai cassé avant de la sécuriser"*.

**Definition of Done Phase 1 :** `terraform apply` from scratch reproduit toute l'infra ; Prowler passe au vert sur les checks critiques ; tu peux tracer une action suspecte de bout en bout dans CloudTrail.

---

## Phase 2 — Kubernetes the Hard Way, puis the Dangerous Way (Semaines 9–16)

**Mission :** comprendre Kube de l'intérieur en le bootstrappant à la main, puis en l'exploitant, puis en le blindant.

### 2.1 — Kubernetes the Hard Way (la forge — tu vas souffrir, c'est voulu)
- [ ] Fais **Kubernetes the Hard Way** de Kelsey Hightower : certs manuels, etcd, API server, scheduler, controller-manager, kubelet, réseau pod — tout à la main, aucun control plane managé.
- [ ] Bonus si tu tiens : rejoue-le sur *ton* infra AWS de la Phase 1.
- **Pourquoi :** après ça, `kubectl` n'est plus une boîte noire. Tu sais ce qu'est un composant du control plane et où sont les clés du royaume (etcd, kubelet, certs).

### 2.2 — L'attaque (comprends la surface)
- [ ] Déploie **Kubernetes Goat** et exploite : pods privilégiés, `hostPath` escape, RBAC trop large, kubelet exposé, secrets en clair, SSRF vers la metadata cloud.
- [ ] Refais au moins deux évasions à la main, sans le guide, sur ton propre cluster.

### 2.3 — Le durcissement (ta valeur)
- [ ] **RBAC** least-privilege réel (audit avec `kubectl-who-can`, `rbac-tool`).
- [ ] **Pod Security Standards** (restricted) + admission control : **Kyverno** ou **OPA Gatekeeper** — écris tes propres policies (interdire privileged, forcer readOnlyRootFilesystem, signer les images…).
- [ ] **Network policies** avec **Cilium** (default-deny puis ouverture explicite).
- [ ] Runtime security : **Falco** (détecte le shell dans un pod, le mount suspect).
- [ ] Scan d'images : **Trivy** / **Grype** ; secrets via un opérateur (External Secrets).

**Portfolio :** repo "k8s-hardening-from-first-principles" (guide + bibliothèque de policies Kyverno/Gatekeeper) + write-up *"Kubernetes the Hard Way, puis je l'ai attaqué"*.

**Definition of Done Phase 2 :** un pod malveillant que tu déploies est bloqué à l'admission OU détecté par Falco ; tu peux dessiner l'architecture du control plane de mémoire.

---

## Phase 3 — CI/CD & supply chain logicielle (Semaines 17–24)

**Mission :** construire une chaîne qui déploie vers ton cluster, la empoisonner, puis la sécuriser de bout en bout.

### 3.1 — La pipeline naïve (échoue ici)
- [ ] Une CI (GitHub Actions ou GitLab CI) qui build une image et la déploie sur ton cluster K8s. Fais-la "confiante" : creds long-terme dans les secrets CI, actions non pinnées, runner sur-privilégié, pas de scan.

### 3.2 — L'empoisonnement (comprends la menace)
- [ ] Monte des scénarios d'attaque supply chain sur *ta* pipeline : exfiltration de secrets CI, dépendance malveillante / dependency confusion, action tierce compromise, artefact tampéré entre build et déploiement.
- [ ] Comprends le modèle de menace type SolarWinds / actions compromises : où est la confiance, où elle casse.

### 3.3 — Le durcissement (ta valeur — c'est le sujet le plus chaud du marché)
- [ ] **OIDC** au lieu de creds long-terme (la CI obtient un rôle AWS temporaire, plus aucun secret statique).
- [ ] Actions/dépendances **pinnées au SHA**, commits signés.
- [ ] **Signature d'artefacts** avec **sigstore/cosign**, et **vérification à l'admission** dans K8s (seules les images signées tournent — boucle bouclée avec la Phase 2).
- [ ] **SBOM** (Syft) + provenance **SLSA**.
- [ ] Gates de sécurité : SAST, SCA, IaC scan (Checkov), scan d'image — bloquants.
- [ ] Runners least-privilege, ephemeral.

**Portfolio :** repo "secure-supply-chain-reference" (pipeline complète signée + vérifiée) + write-up *"J'ai empoisonné ma propre CI/CD, puis je l'ai rendue infalsifiable"*.

**Definition of Done Phase 3 :** une image non signée est refusée par ton cluster ; ta CI n'a aucun secret AWS long-terme ; tu peux tracer la provenance d'un artefact du commit au pod.

---

## Phase 4 — Capstone : la plateforme sécurisée complète + l'angle IA (Semaines 25–40+)

**Mission :** tout relier en une seule plateforme cohérente, et y greffer TON différenciateur (l'IA appliquée à la sécu), pour transformer 4 projets en une histoire de niveau staff.

### 4.1 — La plateforme end-to-end
- [ ] AWS landing zone (Ph.1) → cluster K8s durci (Ph.2) → **GitOps** (ArgoCD ou Flux) → supply chain signée (Ph.3) → observabilité + détection (Falco, GuardDuty, logs centralisés).
- [ ] Le tout reproductible d'un `apply` + un push git. C'est ton "paved road" : la démonstration que tu ne conseilles pas, tu construis le rail sécurisé que les équipes empruntent par défaut.

### 4.2 — Le différenciateur IA (relie à ton outil Codex/Snowflake existant)
Choisis **un** de ces greffons, celui qui t'excite le plus :
- [ ] **Analyseur d'over-permission LLM** : un outil qui ingère les policies IAM (AWS) et/ou le RBAC (K8s) et détecte le sur-privilège en langage naturel, propose la version least-privilege. (Généralise ton outil Snowflake.)
- [ ] **Générateur de policies assisté par IA** : décris une intention en langage naturel → génère la Kyverno/OPA/SCP correspondante, avec tests.
- [ ] **Triage IA d'alertes** : un agent qui enrichit et priorise les alertes Falco/GuardDuty avec du contexte.
- [ ] **Bonus sécu-de-l'IA :** ajoute un red-team de ton propre agent (prompt injection sur l'outil ci-dessus) → tu couvres "IA pour la sécu" ET "sécu pour l'IA", ce que presque personne ne fait.

**Portfolio :** le repo capstone (la plateforme) + l'outil IA en projet phare + **un talk** ("Comment j'ai construit une plateforme sécurisée de zéro + un outil de sécu IA"). Meetup local → OWASP chapter → BSides / THCon / leHACK.

**Definition of Done Phase 4 :** un inconnu peut cloner, lire ton README, et comprendre l'architecture en 10 min ; ton outil IA tourne et tu peux le démo en live ; tu as parlé en public au moins une fois.

---

## Ce que chaque phase te fait gagner (pour te vendre après)

| Phase | Compétence "staff" débloquée | Preuve portfolio |
|---|---|---|
| 0 | Primitives Linux/containers, threat model d'évasion | Container from scratch + write-up |
| 1 | Architecture cloud sécurisée, IAM en profondeur, détection | Module landing zone Terraform |
| 2 | Kube de l'intérieur, admission/RBAC/runtime, offensif K8s | Guide + policy library |
| 3 | Supply chain, provenance, zero-trust CI/CD | Pipeline signée de référence |
| 4 | Vision plateforme (paved roads) + IA appliquée = différenciateur | Plateforme + outil IA + talk |

---

## Discipline de publication (le portfolio comme sous-produit)

- **1 write-up par phase minimum** (donc ~1 toutes les 4–6 semaines). Format qui marche : *ce que je voulais faire → comment ça a cassé → ce que j'ai compris → comment je l'ai sécurisé*. Les gens adorent les récits d'échec technique honnêtes.
- **README impeccable** sur chaque repo : diagramme d'archi, "comment reproduire", threat model, "ce que j'ai appris".
- **LinkedIn** : un post court à chaque milestone. Tu construis en public → les recruteurs et CTO de scale-up te trouvent.
- **`FAILURES.md`** dans chaque repo. C'est contre-intuitif mais c'est ce qui te rendra fier en relisant, et c'est un signal de maturité rare.

---

## Anti-abandon (à relire les jours sombres)

- Quand tu es bloqué > 2 h : écris précisément le blocage dans `FAILURES.md`, puis dors dessus. La moitié des débloquages arrivent le lendemain.
- Le but n'est pas que ça marche vite. Le but est que tu comprennes *pourquoi* ça ne marchait pas. Kubernetes the Hard Way est censé faire mal.
- Coupe le scope, jamais la qualité. Mieux vaut une Phase 1 finie et publiée qu'une Phase 4 rêvée jamais commencée.
- Chaque `Definition of Done` verte = un moment de fierté que tu as mérité en galérant. C'est ça, "échouer fort puis réussir".
