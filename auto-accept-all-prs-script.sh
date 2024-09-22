#!/bin/bash

# Check if gh is installed
if ! command -v gh &>/dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install it first."
    exit 1
fi

# Check if user is authenticated with gh
if ! gh auth status &>/dev/null; then
    echo "You are not authenticated with GitHub CLI. Please run 'gh auth login' first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    echo "Not in a git repository. Please run this script from within a git repository."
    exit 1
fi

# Get remote repository URL and extract owner/repo
remote_url=$(git config --get remote.origin.url)
repo=$(echo $remote_url | sed -n 's#.*/\([^.]*\)\.git#\1#p')
echo "Current repository: $repo"

# Function to merge a PR
merge_pr() {
    local pr_number=$1
    echo "Merging PR #$pr_number"
    gh pr merge $pr_number --auto --merge

    if [ $? -eq 0 ]; then
        echo "PR #$pr_number merged successfully."
    else
        echo "Failed to merge PR #$pr_number"
    fi
}

# Get list of open PRs
open_prs=$(gh pr list --limit 1000 --json number --jq '.[].number')

# Count open PRs
pr_count=$(echo "$open_prs" | wc -l)

echo "There are $pr_count open pull requests."
echo "Are you sure you want to merge ALL open pull requests? This action cannot be undone."
read -p "Type 'YES' to confirm: " confirmation

if [ "$confirmation" != "YES" ]; then
    echo "Operation cancelled."
    exit 1
fi

# Merge all open PRs
for pr in $open_prs; do
    merge_pr $pr
done

echo "All open pull requests have been processed."
