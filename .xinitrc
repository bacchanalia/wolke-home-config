~/.xconfig
( sleep 10; xconfig ) &

sudo wauto -p &
pulse-enable on
sudo bluetooth off &
sudo fan auto &
taffybar-restart --daemon --quiet
parcellite -d &
sudo sbox-umount &
( sleep 2; pulse-vol mic mute ) &
term -t qtemail-daemon -r email-daemon.pl

exec xmonad
