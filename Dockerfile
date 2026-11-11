FROM busybox:1.37.0-musl@sha256:5624bb6777cf469b1fb50ae3f981b15d2715ee2fffaf20b9998cfb7843726835
RUN ["sh", "-ec", "awk '$2 == \"00000000\" { found=1 } END { exit !found }' /proc/net/route; mkdir /www; printf '%s\\n' 'vibenest-host3-bridge-smoke-20261110' > /www/index.html"]
USER 65534:65534
EXPOSE 8080
CMD ["httpd", "-f", "-p", "8080", "-h", "/www"]
