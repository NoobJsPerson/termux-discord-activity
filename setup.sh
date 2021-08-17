login='echo $(expr $(cat ~/.sessions) + 1) > ~/.sessions'
logout='echo $(expr $(cat ~/.sessions) - 1) > ~/.sessions'
echo $login > .bashrc
echo $logout > .bash_logout
echo $login > .zshrc
echo $logout > .zlogout
mv .env.example .env
echo 0 > .sessions
echo 'setup completed'
