echo 'echo $(expr $(cat .sessions) + 1) > .sessions' > .bashrc
echo 'echo $(expr $(cat .sessions) - 1) > .sessions' > .bash_logout
mv env.example env
echo 'setup completed'
