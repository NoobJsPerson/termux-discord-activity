login='echo $(expr $(cat ~/.sessions) + 1) > ~/.sessions'
logout='echo $(expr $(cat ~/.sessions) - 1) > ~/.sessions'
case $SHELL in
  "/data/data/com.termux/files/usr/bin/bash") echo $login > .bashrc && echo $logout > .bash_logout ;;
  "/data/data/com.termux/files/usr/bin/zsh") echo $login > .zshrc && echo $logout > .zlogout ;;
esac
mv .env.example .env
echo 0 > .sessions
echo 'setup completed'
