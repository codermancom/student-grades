# Grade checker

Simple TypeScript program that takes an input of student data and outputs objects for passing, failing and all students. The program determines the average grade, subjects taken and the number of students who passed and failed.

## Input

```json
{
  "students": [
    {
      "name": "Alice",
      "age": 20,
      "results": [
        {
          "subject": "English",
          "score": 78,
          "grade": "B"
        },
        ...
      ]
    },
    ...
  ]
}
```

## Usage

```bash
$ npm install
$ tsx grade.ts
```

## Sample Output

```
All students: [
  'Alice passed with an average grade of 85',
  ...
]
All subjects taken by students:  [ English: 4, Math: 4, Science: 4, Photography: 1 ]
Least interesting Subject:  Photography
```
