FROM httpd:2.4
COPY ./BuildEnvs/ /usr/local/apache2/htdocs/
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
