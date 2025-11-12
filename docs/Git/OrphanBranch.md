---
title: Creating Orphan Branches
---

## What is an Orphan Branch?

An orphan branch is an independent branch with no commit history that doesn't share any history with other branches. This type of branch is commonly used to create completely independent content, such as GitHub Pages websites or documentation pages.

## Use Cases

- **GitHub Pages**: Create a `gh-pages` branch to host static websites
- **Documentation Sites**: Documentation independent from the main codebase
- **Independent Projects**: Manage completely different content within the same repository

## Creating an Orphan Branch

### Step 1: Create a New Orphan Branch

```bash
git checkout --orphan gh-pages
```

This command creates a new branch named `gh-pages` without inheriting any commit history.

### Step 2: Clear the Working Directory

After creating an orphan branch, all files remain in the working directory (in staged state). You need to remove these files:

```bash
git rm -rf .
```

### Step 3: Add New Content

Now you can add new files to this branch:

```bash
# Create a new HTML file
echo '<!DOCTYPE html>
<html>
<head>
    <title>My GitHub Pages</title>
</head>
<body>
    <h1>Welcome to My GitHub Pages</h1>
    <p>This is a static page hosted on GitHub Pages.</p>
</body>
</html>' > index.html

# Add and commit
git add index.html
git commit -m "Initial commit for gh-pages"
```

### Step 4: Push to Remote

```bash
git push origin gh-pages
```

If this is the first time pushing this branch, you may need to set the upstream branch:

```bash
git push -u origin gh-pages
```

## Switching Between Branches

### Switch Back to Main Branch

```bash
git checkout master
# or
git checkout main
```

### Switch to Orphan Branch

```bash
git checkout gh-pages
```

## Complete Example: Creating GitHub Pages

Here are the steps to create a complete GitHub Pages website:

```bash
# 1. Create orphan branch
git checkout --orphan gh-pages

# 2. Remove all files
git rm -rf .

# 3. Create simple website structure
mkdir -p css js

# 4. Create index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Documentation</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Project Documentation</h1>
    </header>
    <main>
        <section>
            <h2>Welcome</h2>
            <p>This is a static documentation website built with GitHub Pages.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 My Project</p>
    </footer>
</body>
</html>
EOF

# 5. Create CSS stylesheet
cat > css/style.css << 'EOF'
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

header {
    background: #333;
    color: #fff;
    padding: 1rem;
    margin-bottom: 2rem;
}

footer {
    margin-top: 2rem;
    padding: 1rem;
    background: #f4f4f4;
    text-align: center;
}
EOF

# 6. Create .gitignore (if needed)
echo "*.log" > .gitignore

# 7. Commit all changes
git add .
git commit -m "Initial GitHub Pages setup"

# 8. Push to remote
git push -u origin gh-pages
```

## Enabling GitHub Pages on GitHub

1. Go to your repository's **Settings**
2. Find the **Pages** section
3. Under **Source**, select the `gh-pages` branch
4. Choose either the root directory `/ (root)` or `/docs` folder
5. Click **Save**

Your website will be live at `https://<username>.github.io/<repository>/`.

## Deleting an Orphan Branch

If you no longer need the branch:

```bash
# Delete local branch
git branch -D gh-pages

# Delete remote branch
git push origin --delete gh-pages
```

## Important Notes

- Orphan branches are completely independent and don't affect other branches
- The working directory content changes completely when switching branches
- Make sure to commit or stash your changes before switching branches
- Orphan branches are perfect for hosting static content unrelated to the main codebase

## References

- [GitHub Pages Official Documentation](https://docs.github.com/en/pages)
- [Git checkout orphan branch](https://git-scm.com/docs/git-checkout)
