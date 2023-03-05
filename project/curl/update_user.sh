 curl -H 'Content-Type: application/json' \
     -d '{ "firstName":"Updated foo", "lastName":"bar", "username": "fbar"}' \
      -X PUT \
      http://localhost:3000/users/$1

 echo
