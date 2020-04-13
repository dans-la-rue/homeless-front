FROM gitpod/workspace-full

#USER gitpod

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && #     sudo apt-get install -yq bastet && #     sudo rm -rf /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/config-docker/

#RUN sudo apt-get update \
 #&& sudo apt-get install -y tool \
 #&& sudo rm -rf /var/lib/apt/lists/*

RUN wget -O ~/vsls-reqs https://aka.ms/vsls-linux-prereq-script && chmod +x ~/vsls-reqs && sudo ~/vsls-reqs

