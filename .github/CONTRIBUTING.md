# Contributing to Angular Vitest Testing Guide

Hey! First off - thank you for even thinking about contributing. Seriously, that means a lot. 🎉

This is mainly my **learning-in-public project**, but having others chip in makes it so much better for everyone.

## 🎯 What We're Building Here

I'm trying to:
- Document real-world Angular 21 + Vitest testing patterns (the kind you actually use at work)
- Help folks migrate from Karma to Vitest without losing their minds
- Create a testing resource that doesn't assume you already know everything
- Share the real learning journey - wins, failures, and everything in between

## 🤝 How You Can Help

### 1. Spot a Bug? Tell Me!

If you find a test that's broken, flaky, or just plain wrong:

1. Open an issue and describe what's up
2. Tell me which file and test (so I can find it!)
3. Explain what's broken and why
4. If you know how to fix it, share that too

**Example**:
```
Title: "Component test in app.spec.ts fails in production mode"
Description: The "should render title" test crashes when running with
--configuration=production because...
Suggested fix: Maybe we should...
```

### 2. Know a Better Way? Show Me!

Seriously, if you've got a better approach:

1. Open a discussion in the "Ideas" category
2. Explain what's currently not working well
3. Share your better approach with actual code
4. Tell us why it's better (performance? readability? less likely to break?)

### 3. Learning Too? Let's Share!

If you're also figuring out Vitest:

1. Drop your discoveries in the "Show and tell" discussions
2. Share the testing pattern you figured out
3. Include code (we all love code examples)
4. Explain when you'd use it

### 4. Make the Docs Better

Documentation can always be clearer. If you spot:

- Typos or weird grammar (I type fast, mistakes happen!)
- Confusing explanations (if you had to read it twice, it needs work)
- Missing examples (sometimes I forget to show, not just tell)
- Code comments that make no sense

**For quick fixes**: Just open a PR
**For big changes**: Let's talk about it in an issue first

### 5. Add New Examples

Got a testing scenario I haven't covered?

1. Check if it's already in here somewhere
2. Open an issue describing what you want to add
3. Wait for the green light (saves you from wasting time on duplicates)
4. Create it following the same structure as existing examples

## 📝 Contribution Guidelines

### Code Style

- Follow existing code formatting
- Use TypeScript strict mode
- Write clear, descriptive test names
- Add comments explaining non-obvious testing patterns
- Keep examples focused and minimal

### Test Quality

All tests should:
- ✅ Actually test what they claim to test
- ✅ Be deterministic (not flaky)
- ✅ Run quickly (< 1 second per test)
- ✅ Be independent (no test interdependencies)
- ✅ Have clear arrange-act-assert structure

### Documentation

- Use clear, simple language
- Include code examples
- Explain the "why" not just the "how"
- Link to official docs when relevant
- Keep it practical and actionable

### Commit Messages

Use conventional commits format:

```
feat: add service testing example with HttpClient
fix: correct async test timeout issue
docs: improve quick reference mocking section
test: add edge case for signal form validation
refactor: simplify component test setup
```

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test everything**: `npm test`
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Explain what changed and why
   - Include screenshots/examples if relevant

## 🚫 What Doesn't Fit Here

Let's keep this focused, so I'm not looking for:

- ❌ E2E testing stuff (Playwright's great for that, but it's a different beast)
- ❌ Non-Angular testing patterns (there are plenty of React testing guides out there)
- ❌ Older Angular versions (we're all-in on Angular 21+)
- ❌ Other test runners (Vitest only - keeps things simple)
- ❌ Overly complex examples (if it takes 200 lines to explain, it's probably too much)
- ❌ Full production apps (this is about testing patterns, not complete applications)

## 🐛 Reporting Bugs

### In Tests
```markdown
**Test File**: src/app/components/example/example.spec.ts
**Test Name**: "should handle user input"
**Issue**: Test fails intermittently
**Expected**: Test should pass consistently
**Actual**: Fails ~30% of the time
**Steps to Reproduce**: 
1. Run `npm test`
2. Test fails randomly
**Environment**: 
- OS: Windows 11
- Node: v20.10.0
- Angular: 21.0.0
```

### In Documentation
```markdown
**File**: docs/QUICK-REFERENCE.md
**Section**: "Mocking HttpClient"
**Issue**: Code example has syntax error
**Line**: 45
**Problem**: Missing import statement
```

## 💡 Suggesting Enhancements

Use this template:

```markdown
**Enhancement Type**: [New Example / Better Pattern / Documentation / Other]

**Current Situation**: 
Describe what exists now or what's missing

**Proposed Enhancement**:
Clear description of what you'd like to see

**Why This Matters**:
How does this help learners?

**Example** (if applicable):
Code snippet showing the enhancement
```

## ❓ Got Questions?

Wondering about:
- How to test a specific thing?
- Why I wrote a test a certain way?
- General Angular or Vitest stuff?

**Don't open an issue for questions!** Instead:
1. Check the [docs folder](docs/) first - I might've already answered it
2. Search through existing discussions - someone else might've asked
3. If still stuck, open a new discussion in the "Q&A" category

## 📚 Resources for Contributors

### Testing Best Practices
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Vitest Best Practices](https://vitest.dev/guide/best-practices.html)
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles)

### Angular 21 Features
- [Standalone Components](https://angular.dev/guide/components)
- [Signals](https://angular.dev/guide/signals)
- [New Control Flow](https://angular.dev/guide/templates/control-flow)

### Vitest Resources
- [Vitest API](https://vitest.dev/api/)
- [Vitest Config](https://vitest.dev/config/)
- [Vitest UI](https://vitest.dev/guide/ui.html)

## 🌟 Credit Where It's Due

If you contribute, you'll be:
- Listed in the project docs (you deserve recognition!)
- Mentioned in related blog posts and videos
- Credited in the Udemy course if your contribution makes it in

## 📜 Let's Keep This Friendly

### The Vibe We're Going For

Everyone's welcome here. Seriously.

### What Good Behavior Looks Like:
- Being welcoming and kind (we're all learning)
- Respecting different viewpoints (there's often more than one right way)
- Taking criticism well (it makes us all better)
- Focusing on what helps the community
- Remembering there are humans behind the usernames

### What's Not Cool:
- Trolling, insults, or personal attacks (just... don't)
- Harassment of any kind (public or private)
- Sharing someone's private info without permission
- Anything else that makes people uncomfortable or unwelcome

### Enforcement

Project maintainers have the right to remove, edit, or reject:
- Comments
- Commits
- Code
- Wiki edits
- Issues
- Pull requests

that don't align with this Code of Conduct.

## 🙋 Getting Help

**For Contributors**:
- Read the [Quick Reference](docs/QUICK-REFERENCE.md) for testing patterns
- Check [existing issues](https://github.com/olayeancarh/angular-vitest-testing-guide/issues)
- Ask in [Discussions](https://github.com/olayeancarh/angular-vitest-testing-guide/discussions)

**For General Angular/Vitest Help**:
- [Angular Discord](https://discord.gg/angular)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/angular+vitest)

## 📬 Contact

- **GitHub Issues**: For bugs and enhancements
- **GitHub Discussions**: For questions and ideas
- **Project Owner**: [@olayeancarh](https://github.com/olayeancarh)

---

## 🎉 Seriously, Thank You

Your help makes this whole thing better for everyone learning Angular testing. Whether you:
- Spotted and reported a bug
- Suggested a better way to do something
- Shared what you discovered
- Fixed a typo

**It all matters.** Thank you for being part of this! 🚀

---

**Remember**: This is a learning project. Mistakes aren't failures - they're how we get better. If you're not sure about something, just ask. We're figuring this out together.
