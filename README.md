# crawler-ts
Pensando em uma aplicação, onde um cliente necessita de determinados endereços geocodificados. Desenvolva um servidor em NodeJs com typescript onde será possível salvar o endereço geocodificado em algum arquivo.


# GET
```
http://localhost:8000/
```
Receberá como resposta todos os endereços do arquivo .csv do projeto codificados e apresentados no seguinte esquema

```
 {
   id
   endereço
   latitude
   longitude
}
```
# 
```
http://localhost:8000/:address
```
Receberá como resposta o endereço inserido pelo usuário codificado e apresento no mesmo equema mostrado anteriormente.
