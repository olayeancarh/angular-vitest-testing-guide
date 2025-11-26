# Angular 21 + Vitest Testing Guide

> Hey there! I'm building this guide in public as I learn to test Angular 21 apps with Vitest. Real struggles, real solutions, real tests.

[![Angular](https://img.shields.io/badge/Angular-21-red.svg)](https://angular.dev)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-green.svg)](https://vitest.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 What This Is

So Angular 21 just dropped, and they made **Vitest the default test runner**. Pretty big deal, right? But here's the thing - there aren't many comprehensive testing resources out there yet.

I decided to change that by documenting everything I learn as I learn it. Every test I write, every bug I hit, every "aha!" moment - it's all going in here.

**This is me learning in public.** You'll see the messy parts, the frustrations, and hopefully the breakthroughs too. No polished, perfect tutorials here - just real-world learning.

## 🚀 Why This Matters

Look, I'll be honest with you:

- **Karma is gone** - Angular 21 dropped it. Vitest is the path forward now, whether we like it or not
- **We're all figuring this out together** - Thousands of us are migrating right now
- **Good resources are hard to find** - Most of what's out there is either scattered across forums or already outdated
- **We need real examples** - Not just "hello world" tests, but actual, messy, real-world testing scenarios

## 📚 What You'll Find Here

### Working Code Examples
Tests that actually work for real scenarios - components, services, forms, HTTP calls, signals, all that good stuff.

### Documentation That Makes Sense
- [📖 Quick Reference](docs/QUICK-REFERENCE.md) - Copy-paste patterns when you're in a hurry
- [🔬 Research Notes](docs/RESEARCH-HUB.md) - All my technical discoveries and "wait, that works?" moments

### Coming Soon
- Weekly testing guides (as I progress through each topic)
- Pattern libraries for common testing scenarios
- Migration guides from Karma to Vitest

### Learn at Your Own Pace
I'm organizing everything from basics to advanced stuff. Start wherever makes sense for you.

## 🏃 Quick Start

```bash
# Clone the repository
git clone https://github.com/olayeancarh/angular-vitest-testing-guide.git
cd angular-vitest-testing-guide

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests with UI
npm test -- --ui
```

## 📖 Learning Path

### Beginner Level
- ✅ Project setup with Vitest
- ✅ First component test
- ⏳ Testing component inputs/outputs
- ⏳ Basic mocking patterns

### Intermediate Level
- ⏳ Service testing with dependencies
- ⏳ HTTP testing with HttpClient
- ⏳ Testing forms (reactive and signal-based)
- ⏳ Async operations and observables

### Advanced Level
- ⏳ Integration testing strategies
- ⏳ Testing with signals and zoneless components
- ⏳ Migration from Karma to Vitest
- ⏳ Performance optimization and CI/CD

## 🎯 Where I'm At Right Now

**Phase 1**: Foundation & Validation (Weeks 1-4)
**Current Week**: Week 1 - Setup & Exploration ✅

### Week 1 Progress
- [x] Got Angular 21 + Vitest working (finally!)
- [x] First tests are passing (small wins count!)
- [x] Created all the documentation structure
- [ ] Writing my first blog post
- [ ] Recording first video tutorial
- [ ] Making 3-5 short videos for social media

## 🛠️ Tech Stack

- **Angular 21** - Latest version with standalone components
- **Vitest 4.0** - Fast, modern test runner
- **TypeScript** - Type-safe testing
- **Testing Library** - Best practices for component testing

## 📝 What's Coming

This repo is just the beginning. Here's what else I'm building:

### Blog Posts
Deep-dive tutorials on every testing pattern I discover. No fluff, just real solutions.

### YouTube Videos
Visual walkthroughs when code alone doesn't cut it. Mistakes included.

### Udemy Course
The ultimate guide - everything I've learned, structured and polished (launching in 20 weeks if all goes well!)

### Quick Social Media Tips
TikTok/YouTube Shorts/Reels for those "I just need to know this one thing" moments

## 🤝 Want to Follow Along?

Learning Angular + Vitest too? Let's do this together:

- ⭐ **Star this repo** so you can find it later (and it motivates me to keep going!)
- 👁️ **Watch the repo** to get notified when I add new stuff
- 🐛 **Open an issue** if something breaks or you're stuck
- 💬 **Start a discussion** if you want to share what you're learning too

## 🔗 Connect

Let's connect! I'd love to hear from you:

- **Twitter/X**: [@yinkz__](https://twitter.com/yinkz__)
- **LinkedIn**: [Olayinka Akeju](https://www.linkedin.com/in/olayinka-akeju/)
- **Dev.to**: [@olayeancarh](https://dev.to/olayeancarh)
- **GitHub**: [@olayeancarh](https://github.com/olayeancarh)
- **YouTube**: Coming soon - subscribe to get notified!
- **Blog**: Coming soon - building in public!

## 📚 Resources

### Official Documentation
- [Angular 21 Docs](https://angular.dev)
- [Vitest Documentation](https://vitest.dev)
- [Angular Testing Guide](https://angular.dev/guide/testing)

### Community
- [Angular Discord](https://discord.gg/angular)
- [Vitest Discord](https://chat.vitest.dev)

## 🗺️ Project Structure

```
angular-vitest-testing-guide/
├── docs/                    # Comprehensive documentation
│   ├── QUICK-REFERENCE.md
│   ├── PROGRESS-TRACKER.md
│   └── ...
├── examples/                # Isolated testing examples
│   ├── 01-basic-component/
│   ├── 02-service-with-http/
│   └── ...
├── src/                    # Main Angular application
│   ├── app/
│   └── ...
└── README.md
```

## 🎓 How I'm Approaching This

Here's my philosophy for this whole thing:

1. **Real over perfect** - I'm showing you the struggles, not just the wins. That's where the real learning happens
2. **Document everything** - Even the "duh" moments. Future me (and you) will appreciate it
3. **Ship regularly** - Better to publish something decent weekly than something perfect never
4. **We're in this together** - Your questions and feedback make this better for everyone
5. **Go deep, not wide** - Surface-level tutorials are everywhere. We're diving into the why, not just the how
6. **Keep it real** - Real-world problems, not made-up examples that work perfectly every time

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This means you can:
- ✅ Use this code for learning
- ✅ Copy examples into your projects
- ✅ Share with your team
- ✅ Fork and modify
- ✅ Use in commercial projects

## 🙏 Acknowledgments

- Angular Team for making Vitest the default
- Vitest Team for an amazing testing framework
- The Angular community for feedback and support

## 📬 Let's Talk

- **Something's broken?** [Open an issue](https://github.com/olayeancarh/angular-vitest-testing-guide/issues)
- **Got a question?** [Start a discussion](https://github.com/olayeancarh/angular-vitest-testing-guide/discussions)
- **Want to help out?** Check out [CONTRIBUTING.md](.github/CONTRIBUTING.md)
- **Just want to chat about testing?** I'm all ears!

---

**Heads up**: This is a living, breathing learning project. You'll see messy commits, honest mistakes, and real problem-solving in action. That's not a bug, that's the whole point. I'm documenting the actual learning process, warts and all.

**Building in public since November 2025** 🚀

---

## ⭐ Star History

If you find this helpful, please star the repository!

[![Star History Chart](https://api.star-history.com/svg?repos=olayeancarh/angular-vitest-testing-guide&type=Date)](https://star-history.com/#olayeancarh/angular-vitest-testing-guide&Date)
