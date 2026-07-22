# portfolio-page
Portfolio Website with few things, including what I built


/
Claude finished the response
comment je deviens une personne que les gens veulent recruter, comment je deviens un niveau staff security, avec de la connaissance forte en plateforme, en application et pouvoir trouver.
donne moi un plan très détaillé pour envoyer fort, comprendre et envoyer fort


Architected comprehensive staff-level security roadmap combining portfolio building, technical depth, and market positioning
Architected comprehensive staff-level security roadmap combining portfolio building, technical depth, and market positioning
Avant de te donner le plan, une remise à plat honnête, parce qu'elle change complètement la stratégie.

Tu n'as pas un problème de compétences. Ton CV est solide : 6 ans, des métriques réelles (‑90% de vulns conteneurs, ‑50% d'alertes Wiz, 20+ vulns API, 50+ apps frauduleuses), un vrai spectre cloud/data/AppSec/indus. Ce qui te manque pour passer staff et devenir « recrutable », ce n'est pas plus de savoir — c'est du output visible et une spécialité tranchante. Aujourd'hui tu es large mais tu produis en interne, dans un rôle de conseil, sans rien que tu puisses montrer.

Et voilà l'insight central : le remède à ta frustration (« je veux construire des choses que je puisse montrer ») est exactement le même que le chemin vers le niveau staff et la recrutabilité. Construire en public, c'est à la fois la sortie de ton mal-être actuel et le credential qui te fait recruter. Il n'y a pas d'arbitrage. Donc tu n'attends pas le job parfait pour commencer — tu commences cette semaine, quel que soit ton poste.

Ce qu'est réellement le niveau staff
Staff, ce n'est pas « senior + 2 ans ». C'est un changement de nature : tu passes de « je résous des problèmes » à « je multiplie l'impact des autres ». Un staff security engineer possède un domaine de bout en bout, construit les paved roads (les rails sécurisés que les équipes empruntent par défaut), a une crédibilité technique qui fait autorité, et influence l'architecture à l'échelle de l'org. Larson (Staff Engineer) et Tanya Reilly (The Staff Engineer's Path) décrivent bien les archétypes — lis-en au moins un, ça te donne le vocabulaire pour te vendre.

Le profil est en T : large partout (tu l'as déjà), profond sur 1 ou 2 sujets (c'est ça qui te manque). Personne ne recrute staff « le mec qui touche à tout ». On recrute « la personne qui est la référence sur X ».

Ton positionnement (la spécialité à revendiquer)
Vu ton parcours + tes envies, je te propose un axe net :

Staff Product Security Engineer, orienté build, avec une différenciation IA.

Concrètement, trois briques qui forment un récit cohérent :

Primaire — Product/Application Security qui construit. Pas « je review et je conseille » (ton rôle actuel), mais « je construis le rail sécurisé des équipes dev » : pipelines SAST/SCA, threat modeling à l'échelle, guardrails-as-code, secure SDLC. Ça capitalise sur ton AppSec + DevSecOps + automatisation, et ça te sort du conseil pur.
Différenciateur — AI Security, dans les deux sens. « IA pour la sécu » (ton outil Codex de revue d'accès Snowflake est une graine en or) et « sécu pour l'IA » (LLM security, red teaming d'agents, supply chain ML). Peu de gens couvrent les deux. C'est chaud, c'est rare, et tu as déjà mis le pied dedans.
Transverse — « trouver ». La capacité offensive à réellement dénicher des vulns. Sans ça, ta crédibilité AppSec est en carton : on ne construit pas de bons guardrails si on ne sait pas soi-même casser le code.
Le pitch d'une phrase : « Product Security Engineer niveau staff qui construit des outils de sécurité augmentés par l'IA, sécurise les systèmes IA, avec une vraie crédibilité offensive. » Ça, ça se recrute, et ça te distingue.

Les trois piliers : quoi approfondir et comment
Plateforme. Tu connais AWS/IAM/Wiz. Passe de l'utilisateur à l'architecte : logique d'évaluation des policies IAM, SCP/permission boundaries/cross-account, sécurité Kubernetes (RBAC, admission controllers OPA/Kyverno, network policies), IaC security (policy-as-code avec OPA/Conftest, Checkov), supply chain (SLSA, sigstore, SBOM), detection engineering cloud. Pour pratiquer en mode offensif : CloudGoat et flaws.cloud (AWS vulnérable by design), Kubernetes Goat.

Application. Le cœur de ta valeur. Approfondis les classes de vulns au-delà de l'OWASP Top 10 récité, le secure code review comme discipline, le threat modeling structuré (STRIDE, data flow diagrams — le livre d'Adam Shostack fait référence). Ressource n°1, gratuite et incontournable : PortSwigger Web Security Academy (fais-la en entier). Pour le code review : lis les write-ups de GitHub Security Lab et les rapports de bug bounty publics ; « The Art of Software Security Assessment » reste la bible.

Trouver. C'est le muscle que tu dois développer et il est mesurable. Fais du bug bounty sur YesWeHack (plateforme française, pratique pour toi), HackerOne, Bugcrowd. Vise la certif Burp Suite Certified Practitioner (BSCP) : très pratique, bien vue, et elle construit littéralement ta capacité offensive web. Un peu de CTF (pwn.college) en complément. Chaque vuln trouvée = une preuve concrète + potentiellement un write-up.

Pour l'IA sécu : OWASP LLM Top 10, OWASP ML Security Top 10, MITRE ATLAS, et de la pratique de prompt injection / red teaming sur des agents.

La stratégie de portfolio (ta priorité absolue)
C'est ce qui te transforme d'« un bon ingénieur invisible » en « quelqu'un qu'on veut ». Cinq leviers :

Ton projet signature. Open-source une version généralisée et non-Betclic de ton outil de revue d'accès augmentée par l'IA — genre un outil qui analyse les permissions IAM cloud/data via LLM pour détecter le sur-privilège. C'est ta pièce maîtresse : elle prouve que tu construis, que tu maîtrises l'IA appliquée, et que tu comprends la data access governance.
Un blog. Série « Building AI-powered security tools » + write-ups de tes trouvailles en bug bounty (dans le respect de la divulgation). 1 article / 3-4 semaines suffit si c'est bon.
Un GitHub vivant. Ton outil + petits utilitaires + contributions à des projets sécu OSS existants.
Des talks. Meetup local → OWASP chapter → BSides → conf (leHACK, THCon). Ton premier talk peut littéralement être « comment j'ai construit mon outil IA ».
LinkedIn actif. Tu partages ce que tu construis et apprends. C'est là que les recruteurs et les CTO de scale-ups te trouvent.
Le plan par phases
Mois 0 (cette semaine). Rewrite du CV en verbes « Built/Designed/Shipped » plutôt que « Advised/Reviewed » — même ton rôle de référent se raconte via l'outil IA que tu as construit. Choisis tes 2 spikes (je te conseille AppSec-build + AI security). Crée le repo GitHub et le blog. Publie le premier post « je me lance ».

Mois 1-3. Ship le premier artefact public (v0 de ton outil IA + 1 article). Attaque PortSwigger Academy et lance-toi sur YesWeHack. Objectif : première vuln trouvée, premier outil en ligne.

Mois 3-9. Profondeur : BSCP, threat modeling, K8s/IaC security. Rythme régulier de publication. Premier talk en meetup. Tu commences à networker sérieusement (les rôles staff se prennent par intros chaudes, pas par candidatures froides).

Mois 9-18. Signal staff : projet plus ambitieux, talk en conf, contributions reconnues. À ce stade tu ne postules plus vraiment — on te contacte.

Recrutabilité : la mécanique
Ne pars pas en mode « j'attends de monter en niveau pour bouger ». Ton problème immédiat, c'est un rôle où tu ne construis rien — donc change pour un poste où tu peux construire dès maintenant (startup/scale-up hands-on, ce que tu vises déjà), et bâtis le portfolio en parallèle. Le portfolio t'aide à décrocher le meilleur poste ; le poste te donne matière à portfolio. C'est un cycle vertueux, pas une séquence.

Pour les entretiens staff sécu, prépare : threat modeling en live, security system design, code review sur table, take-homes. Structure tes 3-4 stories d'impact en STAR (le ‑90% conteneurs, le ‑50% Wiz, l'outil IA). Cible les boîtes qui construisent des produits IA — elles ont un besoin criant d'AI security et tu arriveras avec un angle que personne d'autre n'a.

Si tu veux, je peux transformer tout ça en un document structuré et trackable (avec cases à cocher par phase et une checklist de premiers pas concrets), ou t'aider dès maintenant à réécrire ton CV en version « builder » et à cadrer le premier projet open-source. Par quoi tu veux commencer ?

je veux du portfolio, mais pas forcément faire du bugbounty. je veux construire des choses qui me permettent de comprendre comment fonctionne kube, comment fonctionne une chaine cicd, comment monter une infra aws de 0 sécurisée.

fait moi une mega roadmap, et laisse moi créer, je veux faire en sorte d'échouer fort


En train de concevoir une roadmap complète pour maîtriser Kubernetes, CI/CD et infrastructure AWS sécurisée
En train de concevoir une roadmap complète pour maîtriser Kubernetes, CI/CD et infrastructure AWS sécurisée
d'échouer fort parce que c'est dûr, et après réussir et être fier


Architected phased security-focused roadmap balancing struggle and mastery
Architected phased security-focused roadmap balancing struggle and mastery
va-y, c'est exactement le bon état d'esprit. Échouer fort sur des trucs durs, c'est la seule façon de comprendre en profondeur — pas en lisant, en te cognant. Je te construis la roadmap dans cette philosophie : construire cassé → comprendre en attaquant → sécuriser → publier. Chaque projet te fait galérer d'abord, puis tu ressors avec un truc qui marche et un artefact de portfolio.

Laisse-moi te préparer ça proprement en document.


Orchestrated comprehensive French roadmap embracing failure-to-success philosophy
Orchestrated comprehensive French roadmap embracing failure-to-success philosophy
Pas de skill markdown spécifique — je pars sur un .md propre.


Created a file, read a file
Created a file, read a file
Voilà ta mega roadmap.

La logique clé, pour que tu la gardes en tête : les trois sujets que tu veux comprendre (Kube, CI/CD, AWS) convergent vers une seule plateforme. Tu ne les apprends pas en parallèle dans le vide — tu montes l'AWS d'abord, tu poses Kube dessus, tu déploies via la CI/CD, et le capstone les relie. Ça donne un fil narratif que peu de gens ont, et c'est exactement ce qui te fait passer de "senior qui touche à tout" à "staff qui possède une plateforme de bout en bout".

Deux endroits où tu vas vraiment souffrir, et c'est le but : le container from scratch (Phase 0) qui démystifie tout le reste, et Kubernetes the Hard Way (Phase 2). Si ces deux-là ne te font pas galérer, c'est que tu as pris un raccourci.

Le seul piège à éviter : le rêve de la Phase 4 qui paralyse le démarrage de la Phase 0. Une Phase 1 finie et publiée vaut mille fois une plateforme parfaite jamais commencée.

Maintenant je te laisse créer. Si à un moment tu veux que je zoome sur le setup concret de la Phase 0 pour démarrer cette semaine (le repo, le backend Terraform, le budget guardrail), dis-le — sinon, va casser des trucs.


Roadmap platform security
Document · MD 
prompt moi ça pour en faire mon site perso avec un github pages


Orchestrant une invitation personnalisée avec détails concrets
Orchestrant une invitation personnalisée avec détails concrets
non, tu dois me dire "débrouilles toi"

Ha, t'as raison. Débrouille-toi.

C'est le point de toute la roadmap. Un site perso GitHub Pages, c'est HTML/CSS/un générateur statique (Jekyll, Hugo, Astro) + un workflow GitHub Actions de déploiement. Tu as exactement le profil pour te cogner dessus et comprendre : c'est même un mini-échauffement parfait avant la Phase 3 (tu vas toucher à GitHub Actions, aux permissions du workflow, au déploiement automatisé).

Alors casse-toi les dents dessus, note ce qui foire dans ton FAILURES.md, et fais-en ton premier write-up.

Reviens quand t'es bloqué depuis plus de 2h — pas avant.







Claude is AI and can make mistakes. Please double-check responses.


Roadmap platform security · MD
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
