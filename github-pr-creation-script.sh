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

# Function to create a PR
create_pr() {
    local source_branch=$1
    local target_branch=$2
    local title="Merge $source_branch into $target_branch"
    local body="This PR merges changes from $source_branch into $target_branch"

    echo "Creating PR from $source_branch to $target_branch"
    pr_url=$(gh pr create --base "$target_branch" --head "$source_branch" --title "$title" --body "$body" --repo "$repo")
    
    if [ $? -eq 0 ]; then
        echo "PR created successfully: $pr_url"
    else
        echo "Failed to create PR from $source_branch to $target_branch"
    fi
}

# Main script
echo "Enter the source branch name:"
read source_branch

echo "Enter the GitHub repository (format: owner/repo):"
read repo

echo "Enter the target branches (space-separated):"
read -a target_branches

# Fetch the latest changes
git fetch origin

# Check if source branch exists
if ! git ls-remote --exit-code --heads origin "$source_branch" &> /dev/null; then
    echo "Source branch $source_branch does not exist on remote."
    exit 1
fi

# Create PRs
for target_branch in "${target_branches[@]}"
do
    # Check if target branch exists
    if git ls-remote --exit-code --heads origin "$target_branch" &> /dev/null; then
        create_pr "$source_branch" "$target_branch"
    else
        echo "Target branch $target_branch does not exist on remote. Skipping."
    fi
done

echo "Process completed."
