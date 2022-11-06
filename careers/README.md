# Reviewable Careers

Do you have a passion for dev tooling, code review, or building software that helps your fellow engineers get the job done? Then you will fit right in with the team at Reviewable! We have been helping programmers around the world experience *serious GitHub code reviews* since 2014, and have been having lots of fun doing it. You can check out our job listings below.

## About Us

Reviewable is a very small, bootstrapped business that sells our code review software to some of the largest companies around.  We've been around long enough to be much more stable than your average startup, yet stayed small enough to avoid crippling bureaucracy &mdash; everybody reports directly to the founder/CEO.  We're engineer-centric and fully remote.  However, we prefer hiring US residents and offer the usual benefits:  health and dental insurance, 401(k) plans with company contributions, unlimited vacation, etc.  We've built a company and a codebase where we enjoy working day-to-day and hope that you will too!

## Open Roles

### Backend engineer

We're looking for a generalist who can handle most anything except UI, though the code you write may run either on the client or the server.  Ideally, you'd have knowledge and experience in some or all of:
- **Algorithms and data structures**:  You have a mental library of common (and less common!) algorithms you can draw on and adapt to solve problems.  If needed, you can research more specialized algorithms (even in academic literature) or create them from scratch.  Typical tasks would be improving our diffing engine, implementing file rename and partial copy detection, or optimizing rebased commit matching.
- **`git` data model**:  You have a deep understanding of `git`'s model primitives and how they combine to represent non-trivial scenarios.  You rebase and cherry-pick fearlessly, laugh (knowingly) at octopus merges, and can sketch out a repo's expected structure of references, commits, trees and blobs after any user ~~screw-up~~ operation.  Tasks might include figuring out what happened in a user's repo (perhaps without having access to it), and mapping `git` models to our internal data structures.
- **GitHub APIs**:  You know your way around both GitHub's RESTful and GraphQL APIs, understand GitHub's OAuth app permission model, and can propose strategies for dealing with GitHub's API rate limiting in a decentralized system.  You can find the right API call to use to satisfy a feature need or conclude with confidence that one doesn't exist.  Sample tasks could be integrating with a new GitHub feature, or figuring out how to reconcile some review-related GitHub functionality with Reviewable's own take on it.
- **Firebase real-time database**:  You've used the Firebase RTDB before, understand its security model, and can work around its tree-shaped data structure and limited query features.  You're able to design schemas that can be evolved gracefully (and in a strictly backwards-compatible fashion) to account for new features, and that simultaneously take bandwidth usage into account.  Tasks all orbit around designing schemas and debugging permission denied errors.
- **JavaScript and TypeScript**:  You can write clean, elegant code in JavaScript and TypeScript, and set up / debug build toolchains.  You're comfortable with both object-oriented and functional paradigms.  If push comes to shove, you're capable of debugging issues in asynchronous, queue-based systems.

Beyond these technical skills, you must be fluent in English, excellent at written communication, and able to work effectively with minimal supervision.  We're nominally looking for a mid-level engineer, but could accommodate either higher or lower in the right circumstances.  If this sounds like you, please [get in touch](mailto:careers@reviewable.io)!

<hr/>

<!-- <p align="center">Unfortunately, we do not have any open roles at this time...</p> -->
<p>That's all for now...</p>

<hr/>

<sup>...but if you're feeling inspired, we do accept PRs against this repo! 😉</sup>
