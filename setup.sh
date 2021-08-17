echo 'echo $(expr $(cat ~/.sessions) + 1) > ~/.sessions' > .bashrc
echo 'echo $(expr $(cat ~/.sessions) - 1) > ~/.sessions' > .bash_logout
echo 'echo $(expr $(cat ~/.sessions) + 1) > ~/.sessions' > .zshrc
echo 'echo $(expr $(cat ~/.sessions) - 1) > ~/.sessions' > .zlogout
mv .env.example .env
echo 0 > .sessions
echo 'setup completed'
