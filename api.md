## OVERVIEW

### 개발 배경, 비즈니스 목적, 장점
### 공통 요청/응답 형식: API 요청을 할 때 사용하는 데이터 형식, 성공/실패 여부를 상태코드로 제공
### 공통 에러: 문서의 한 섹션(개요 문서)에 공통 에러를 제공하고, 각 API에 공통 에러 테이블을 링크로 연결한다.

# Example of OpenAPI Spec (YAML Format)
openapi: 3.0.0
info:
  title: Old Navy clone coding API
  version: 1.0.0
  description: Example API documentation
servers:
  - url (data.json for index.html): http://localhost:3001/partOne
  - url (data.json for index.html): http://localhost:3001/partTwo
  - url (dataCat.json for category.html): http://localhost:3001/partCat

paths (index.html -> category.html):
  .html?select={select}:
    (Query Parameters used)
    get:
      summary: Get the category data by select
      parameters:
        - select: string (optional) -> none: get all category data
      responses:
        '200':
          description: A single user
          content:
            application/json:
              schema:
                type: object
                properties:
                  select:
                    type: string
        '404':
          description: User not found

paths (category.html -> itme.html):
  .html?id={id}:
  get:
    summary: Get the itme data by id
    parameters: 
      - id: int (required)
      responses:
      '200':
        description: A single user
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: int
      '404':
        description: User not found
