#!/usr/bin/env bash
# Run in macOS Terminal.app (Cursor cannot write ~/.gitconfig or ~/.ssh):
#   cd ~/Documents/portfolio-theatre-inspired && bash scripts/setup-github.sh
#
# Optional: GIT_NAME="..." GIT_EMAIL="your@email" bash scripts/setup-github.sh
set -euo pipefail

echo "=== GitHub setup for macOS ==="

# --- Git identity (override with env vars if needed) ---
GIT_NAME="${GIT_NAME:-Tise Alatise}"
GIT_EMAIL="${GIT_EMAIL:-tisealatise@users.noreply.github.com}"

git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"
echo "Git identity: $GIT_NAME <$GIT_EMAIL>"

# --- SSH key ---
SSH_DIR="$HOME/.ssh"
KEY_FILE="$SSH_DIR/id_ed25519"
mkdir -p "$SSH_DIR"
chmod 700 "$SSH_DIR"

if [[ -f "$KEY_FILE" ]]; then
  echo "SSH key already exists at $KEY_FILE — skipping ssh-keygen."
else
  echo "Generating SSH key (no passphrase). To use a passphrase, run ssh-keygen manually."
  ssh-keygen -t ed25519 -C "$GIT_EMAIL" -f "$KEY_FILE" -N ""
fi

# ssh-agent (macOS)
if [[ "$(uname)" == "Darwin" ]]; then
  eval "$(ssh-agent -s)"
  ssh-add --apple-use-keychain "$KEY_FILE" 2>/dev/null || ssh-add "$KEY_FILE"
  CONFIG="$SSH_DIR/config"
  if [[ ! -f "$CONFIG" ]] || ! grep -q "^Host github.com\$" "$CONFIG" 2>/dev/null; then
    {
      echo ""
      echo "Host github.com"
      echo "  AddKeysToAgent yes"
      echo "  UseKeychain yes"
      echo "  IdentityFile $KEY_FILE"
    } >> "$CONFIG"
    chmod 600 "$CONFIG"
    echo "Appended github.com block to $CONFIG"
  fi
fi

echo ""
echo "=== Add this public key to GitHub ==="
echo "    https://github.com/settings/keys  →  New SSH key"
echo ""
cat "${KEY_FILE}.pub"
echo ""

# --- Point portfolio repo at SSH ---
REPO="${HOME}/Documents/portfolio-theatre-inspired"
if [[ -d "$REPO/.git" ]]; then
  git -C "$REPO" remote set-url origin git@github.com:tisebuilds/portfolio-theatre-inspired.git
  echo "Remote for portfolio-theatre-inspired set to SSH."
  git -C "$REPO" remote -v
else
  echo "Repo not found at $REPO — set remote yourself:"
  echo "  git remote set-url origin git@github.com:tisebuilds/portfolio-theatre-inspired.git"
fi

echo ""
echo "=== Test SSH to GitHub ==="
ssh -T git@github.com || true
echo ""
echo "If you see 'Hi <username>! ...' you're done. Then: cd '$REPO' && git push origin main"
