#!/bin/bash

# Check if gh is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) is not installed. Please install it first."
    exit 1
fi

# Check if user is authenticated with gh
if ! gh auth status &> /dev/null
then
    echo "You are not authenticated with GitHub CLI. Please run 'gh auth login' first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null
then
    echo "Not in a git repository. Please run this script from within a git repository."
    exit 1
fi

# Function to create a PR
create_pr() {
    local source_branch=$1
    local target_branch=$2
    local title="Merge $source_branch into $target_branch"
    local body="This PR merges changes from $source_branch into $target_branch"

    echo "Creating PR from $source_branch to $target_branch"
    pr_url=$(gh pr create --base "$target_branch" --head "$source_branch" --title "$title" --body "$body")
    
    if [ $? -eq 0 ]; then
        echo "PR created successfully: $pr_url"
    else
        echo "Failed to create PR from $source_branch to $target_branch"
    fi
}

# Get current branch
source_branch=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $source_branch"

# Get remote repository URL and extract owner/repo
remote_url=$(git config --get remote.origin.url)
repo=$(echo $remote_url | sed -n 's#.*/\([^.]*\)\.git#\1#p')
echo "Current repository: $repo"

# Fetch the latest changes
git fetch origin

# Get all remote branches
remote_branches=$(git branch -r | grep -v '\->' | sed 's/origin\///')

# Create PRs
for branch in $remote_branches
do
    # Skip the current branch
    if [ "$branch" != "$source_branch" ]; then
        create_pr "$source_branch" "$branch"
    fi
done

echo "Process completed."