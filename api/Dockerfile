FROM php:8.4-cli-alpine

RUN apk add --no-cache \
        postgresql-dev \
        oniguruma-dev \
        git \
        unzip \
    && docker-php-ext-install pdo_pgsql mbstring

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-progress --no-scripts --prefer-dist

COPY . .
RUN composer dump-autoload --optimize

COPY docker/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint \
    && chmod -R ug+w storage bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["entrypoint"]
