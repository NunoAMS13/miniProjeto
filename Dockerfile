FROM ubuntu 
RUN apt update 
RUN apt install -y apache2 
RUN apt install -y apache2-utils 
RUN apt clean 
COPY index.html /var/www/html/
COPY add-receita.html /var/www/html/
COPY detalhes-receita.html /var/www/html/
COPY styles.css /var/www/html/
COPY /imagens/bacalhau.png /var/www/html/imagens/
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
