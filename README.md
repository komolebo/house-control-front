# Repo description
Provides functionality of DJango server running on electronic board with Ubuntu

########################
# Linux service in /etc/systemd/system:
########################
[Unit]
Description=House control service started

[Service]
WorkingDirectory=/home/oleh/housecontrol/house-control-backend/app
ExecStart=/home/oleh/housecontrol/house-control-backend/app/runhousecontrol.sh
ExecReload=/bin/kill -1 -- $MAINPID
ExecStop=/bin/kill -- $MAINPID

Restart=always
#########################

systemctl daemon-reload && systemctl start house-control.service
systemctl enable house-control