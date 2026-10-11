# Steps to Deploy PrimeFlix on AWS EC2

This guide walks you through deploying your **PrimeFlix Streaming Platform (Amazon Prime Video + Netflix Hybrid Web App)** onto an AWS EC2 instance using **Nginx**.

---

## 1. Launch an AWS EC2 Instance
1. Go to the **AWS Management Console** &gt; **EC2** &gt; **Instances** &gt; **Launch Instance**.
2. **Name**: `PrimeFlix-Streaming-WebApp`
3. **AMI**: Amazon Linux 2023 or Ubuntu 22.04 / 24.04 LTS.
4. **Instance Type**: `t2.micro` or `t3.micro` (Free Tier eligible).
5. **Key Pair**: Select or create a `.pem` key pair for SSH access.
6. **Network Settings (Security Group)**:
   - Allow **SSH** (Port `22`) from your IP.
   - Check **Allow HTTP traffic from the internet** (Port `80`).
   - Check **Allow HTTPS traffic from the internet** (Port `443`) *(Optional for SSL)*.

---

## 2. Connect to Your EC2 Instance via SSH

Open your terminal or PowerShell and run:
```bash
# If using Amazon Linux:
ssh -i "your-key.pem" ec2-user@<YOUR-EC2-PUBLIC-IP>

# If using Ubuntu:
ssh -i "your-key.pem" ubuntu@<YOUR-EC2-PUBLIC-IP>
```

---

## 3. Install Nginx Web Server

### On Amazon Linux 2023:
```bash
sudo dnf update -y
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### On Ubuntu 22.04 / 24.04:
```bash
sudo apt update -y
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Verify Nginx is active:
```bash
sudo systemctl status nginx
```

---

## 4. Deploy the PrimeFlix Web App Files

1. Navigate to the web root directory:
```bash
cd /usr/share/nginx/html      # For Amazon Linux
# OR
cd /var/www/html             # For Ubuntu
```

2. Remove default Nginx welcome files:
```bash
sudo rm -rf *
```

3. Transfer your local project files (`index.html`, `style.css`, and `app.js`) to EC2 using `scp`:
From your **local machine terminal** (in `c:\Online-Trainings\Opemi\EC2-WebApp`):
```bash
# For Amazon Linux:
scp -i "your-key.pem" index.html style.css app.js ec2-user@<YOUR-EC2-PUBLIC-IP>:/tmp/

# Move files to web directory on EC2:
ssh -i "your-key.pem" ec2-user@<YOUR-EC2-PUBLIC-IP> "sudo mv /tmp/index.html /tmp/style.css /tmp/app.js /usr/share/nginx/html/ && sudo chmod 644 /usr/share/nginx/html/*"
```

```bash
# For Ubuntu:
scp -i "your-key.pem" index.html style.css app.js ubuntu@<YOUR-EC2-PUBLIC-IP>:/tmp/

# Move files to web directory on EC2:
ssh -i "your-key.pem" ubuntu@<YOUR-EC2-PUBLIC-IP> "sudo mv /tmp/index.html /tmp/style.css /tmp/app.js /var/www/html/ && sudo chmod 644 /var/www/html/*"
```

---

## 5. Restart Nginx and Verify
```bash
sudo systemctl restart nginx
```

Now open your browser and navigate to:
```
http://<YOUR-EC2-PUBLIC-IP>
```

---

## 6. Quick Alternative: Instant Python Server (For Quick Testing)
If you just want to test on EC2 without setting up Nginx:
```bash
# Run in the directory containing index.html, style.css, and app.js
sudo python3 -m http.server 80
```
*(Ensure Security Group allows Port 80 inbound traffic).*