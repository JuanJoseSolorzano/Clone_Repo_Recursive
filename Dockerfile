# Use the official Ubuntu image as a base
FROM ubuntu:latest

# Set environment variables to non-interactive to avoid prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update package list and install required dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js and npm (using NodeSource setup script)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && npm install -g yo generator-code \
    && npm install -g @vscode/vsce \
    && npm install -g webpack webpack-cli \
    && apt-get install -y git 

# Verify the installation of Node.js and npm
RUN node --version && npm --version && yo --version 

WORKDIR /app
RUN cd /app
# - To ensure dependencies are installed correctly, we can use the following command to install them:
#RUN git clone https://github.com/JuanJoseSolorzano/Clone_Repo_Recursive.git && cd Clone_Repo_Recursive \
#    && npm install --save-dev webpack webpack-cli
# Set a working directory

# Set a default command to run when the container starts
CMD ["bash"]
