// 함수형으로 전환하기

// 회원 목록
const users = [
  { id: 1, name: 'AA', age: 35 },
  { id: 2, name: 'BB', age: 32 },
  { id: 3, name: 'CC', age: 37 },
  { id: 4, name: 'DD', age: 40 },
  { id: 5, name: 'EE', age: 25 },
  { id: 6, name: 'FF', age: 20 },
  { id: 7, name: 'GG', age: 28 },
  { id: 8, name: 'HH', age: 27 },
  { id: 9, name: 'II', age: 30 },
  { id: 10, name: 'JJ', age: 31 }
];

// 명령형 코드
// 1: 30세 이상인 user를 수집 한다
const temp_users = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
console.log('30세 이상인 user 모임');
console.log(temp_users);
// 2: 30세 이상인 users의 ame을 수집한다
const temp_users_names = [];
for (let i = 0; i < temp_users.length; i++) {
  temp_users_names.push(temp_users[i].name);
}
console.log('30세 이상인 user 의 이름');
console.log(temp_users_names);
//
//
// 3: 30세 미만인 user를 수집 한다
const temp_users_two = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users_two.push(users[i]);
  }
}
console.log('30세 미만인 user 모임');
console.log(temp_users_two);
// 4: 30세 미만인 users의 age를 수집한다
const temp_users_two_ages = [];
for (let i = 0; i < temp_users_two.length; i++) {
  temp_users_two_ages.push(temp_users_two[i].age);
}
console.log('30세 미만인 user 의 나이');
console.log(temp_users_two_ages);
//
//
//
//
// 이 코드들을 map, filter로 리팩토링 하기
// 1: 30세 이상인 user를 수집 한다
const new_temp_users = users.filter(object => object.age >= 30);
console.log('새로운 방식으로 구현된 30 세 이상인 user');
console.log(new_temp_users);
// 2: 30세 이상인 user의 이름
const new_temp_users_names = new_temp_users.map(object => object.name);
console.log('새로운 방식으로 구현된 30세 이상인 user의 이름');
console.log(new_temp_users_names);
//
//
// 3: 30세 이하인 users를 수집 한다
const new_temp_users_two = users.filter(object => object.age < 30);
console.log('새로운 방식으로 구현된 30세 미만인 user');
console.log(new_temp_users_two);
// 4: 30세 미만인 user의 나이
const new_temp_users_two_ages = new_temp_users_two.map(object => object.age);
console.log('새로운 방식으로 구현된 30세 미만인 user의 나이');
console.log(new_temp_users_two_ages);

// map, filter에 대한 설명
// 유인동 님의 함수형 프로그래밍 강의에는 직접 map 과 filter를 만들어서 사용했다
// 하지만 나는 기본 배열 메소드에 map, filter가 있다는 것을 알고 그것을 사용 했다.

// map, filter에 대한 동작 방식 설명
// map
/*
  someArray라는 배열이 있다고 하자.
  someArray 의 각 요소는 { name: string, age: number, address: string } 이다.

  // 이번 작업에서는 someArray의 name만 있는 배열을 만들것이다
  const helloMap = someArray.map(object => { return object.name })
  // someArray.map(object => { return object.name }) 이 부분에서,
  // object는 someArray의 각 요소이다.
  // return 으로 object.name을 받는데, 그러면
  // 각 요소가 name 인 배열이 리턴된다는 뜻이다.

  helloMap을 출력했을 경우
  someArray의 각 요소의 name만 배열 형태로 출력이 된다.
  즉, map은 배열의 모든 요소를 for문처럼 돌면서, 리턴하는 값들을 배열로 만들어 리턴해주는 함수이다.
  
  당연하게도 map 은 배열에만 사용이 가능하다
*/
// filter
/*
  someArray라는 배열이 있다고 하자.
  someArray 의 각 요소는 { name: string, age: number, address: string } 이다.
  
  // 이번 작업에는 someArray의 요소들 중, age가 30 이상인 요소만 있는 배열을 만들것이다.
  const helloMap = someArray.filter(object => { return object.age > 30 })
  // someArray.filter(object => { return object.age > 30 }) 이 부분에서,
  // object는 당연하게도 someArray의 각 요소이고,
  // return 으로는 각 age의 값에 따라서 true or false가 될텐데,
  // true 일 경우에는 그 요소를 새로운 배열에 추가하고 아닐 경우에는 추가하지 않는다.
  // 이렇게 걸러진 배열을 출력하게 된다

  helloMap을 출력했을 경우
  someArray의 요소들이 출력되는데, age가 30이상인 쇼모단 출력이 된다
  즉, filter는 배열의 모든 요소를 for문처럼 돌면서, 특정 조건에 부합하는 요소들을 모아 배열로 리턴해주는 함수이다.
*/
//
// 다형성
//
/* 
  유인동 님의 강의에서는 map, filter 함수를 만들고, 여기서 for 문을 돌리는 부분을 또 함수형으로 감싸는 코드를 만들었다
  왜 이렇게 했는지 알아보니, 바로 다형성 지원에 있었다.

  JS에는 map, filter 같은 메소드가 이미 존재한다. 내가 사용했던 것 처럼 함수형 처럼 보여지게 동작한다.
  하지만 이는 힘수형 프로그래밍이 아니다.
  이 메소드들은 array인 값에만 사용할 수 있는 메소드로, array_like 같은 array는 아니지만
  우리가 array 처럼 사용하고 있는 변수에는 사용하지 못한다.
  그러나 함수형 프로그래밍으로 map을 사용할 경우, array_like 같은 값도 배열처럼 잘 작동하게 된다.
  (원래 array_like 인 값에 실행을 하면 map 은 없다고 나오게 될 것이다.)

  즉, 객체지향과 함수형 프로그매링의 차이가 여기서 나오는 것이다.
  함수형 프로그래밍은 함수가 기준이고 함수를 기반으로 동작한다면, 객체지향은 객체를 기반으로 동작한다.
  이게 가장 큰 차이이다.
  객체는 해당하는 기능이 있어야지만 동작한다. 하지만 함수형 프로그래밍은 이미 해당하는 기능이 있기 때문에
  평가가 늦어지도라도 생관이 없다. 값만 존해자면 되는 것이기에..
*/
// 유인동 님이 작성하신 함수들 정의해놓았다
// 다형성 높이기
function _is_object(obj) {
  return typeof obj == 'object' && !!obj;
}

// 다형성 높이기
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}
// each 함수
function _each(list, iter) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
}
// 필터 함수
function _filter(list, predi) {
  var new_list = [];
  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}
// 맵 함수
function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val, key) {
    new_list.push(mapper(val, key));
  });
  return new_list;
}

var _map = curry_r(_map);
var _filter = curry_r(_filter);
//

//
//
// 커링
function _curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
}

const add = _curry(function(a, b) {
  return a + b;
});

const add10 = add(10);
console.log(add10(5)); // 15

console.log(add(3)(5)); // 8

// _curry 함수는 fin 이라는 함수를 받고, 익명함수를 리턴하는데 a라는 인자값을 받는다
// 그다음 그 익명함수에는 b라는 인자값을 받는 익명함수를 리턴하게 된다
// 마지막으로 fn을 리턴하게 되는데 여기서 a, b는 위의 함수들에서 받아진 입력 값이다
// 함수를 실행할 때 변수를 늦게 받아도 동작하게 된다.
// 결론은, 본체 함수를 미리 받아두고 나중에 평가받도록 하는 기법을 사용한 것이다.

// 그런데 만약 처음부터 함수를 실행할 때에 인자값을 두개 넣는 경우는 어떨까?
// 지금의 함수 형태라면 함수를 리턴하게 될 것이고 우리가 생각하는데로 동작하지 않는다.
// 하지만 약간의 조건을 넣어주게 되면 훨씬 실용적으로 동작하게 만들 수 있다.

function useful_curry(fn) {
  return function(a) {
    return arguments.length === 2
      ? fn(arguments[0], arguments[1])
      : function(b) {
          return fn(a, b);
        };
  };
}

const useful_add = useful_curry(function(a, b) {
  return a + b;
});

console.log('useful_add');
console.log(useful_add(1, 2)); // 3
console.log(useful_add(1)(2)); // 3

// 이런식으로 함수를 만들게 되면 인자값이 하나일 때는 다른 인자값을 받는 함수가 리턴이 되고,
// 만약인자값이 두개면 즉시 fn함수를 실행하게 된다. 훨씬 실용적인 함수가 됬다.

// 지금 함수는 인자를 왼쪽에서 적용해 나갈 것인지, 오른쪽에서 나갈 것인지를 미리 정의한 함수다.
// 인자를 한번에 두 개받았을 경우에는 a, b 순차적으로 fn함수가 동작 하겠지만,
// 인자를 여러번에 걸쳐서 받았을 때에는 처음 받은 값이 나중에 위치하게 된다 fn (b, a)
function curry_r(fn) {
  return function(a) {
    return arguments.length === 2
      ? fn(arguments[0], arguments[1])
      : function(b) {
          return fn(b, a);
        };
  };
}

function takeAway(a, b) {
  return a - b;
}

const away = curry_r(takeAway);

console.log('curry_r 동작방식');
console.log(away(10, 5));
console.log(away(5)(10));

// _get을 만들어 조금 더 간단하게 하기
// 안전막 설치, 오류방지
const _get = useful_curry(function(obj, key) {
  return obj === null || obj === undefined ? undefined : obj[key];
});
const _getr = curry_r(function(obj, key) {
  return obj === null || obj === undefined ? undefined : obj[key];
});

// users[10]은 없는 값이다
const user1 = users[10];
// 값을 출력했을때 없는 값이므로 undefined가 나오게 된다
console.log(_get(user1, 'name'));
console.log(_get(user1)('name'));
// users3의 name 키 값이 나오게 된다
console.log(_get(users[3], 'name'));
console.log(_get(users[3])('name'));

// 반대로 만들었다
// 먼저 키를 넣고
// 나중에 객체를 넣었다.
const get_name = _getr('name');
console.log(get_name(users[3]));

// _get 함수 덕분에, _map 함수를 쓰는 것도 굉장히 편해졌다
console.log(
  _map(
    _filter(users, function(user) {
      return user.age >= 30;
    }),
    _getr('name')
  )
);

//
//
//
// reduce

// 이 함수는 배열의 프로토타입 메소드를 이용해서 배열을 자르는 함수다
function _rest(list, num) {
  return Array.prototype.slice.call(list, num || 1);
}

// 전 요소의 값을 참고해서, 새로운 값을 생성해낼때 유용
function _reduce(list, iter, memo) {
  // 인자값이 두개일 때는 memo의 첫번째 값을 미리 정해두고
  // 배열의 프로토타입 메소드인 slice를 이용해서 list 배열의 첫 인자를 제거해 준다
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list, 1);
  }

  // each 함수를 실행
  _each(list, function(val) {
    memo = iter(memo, val);
  });

  return memo;
}

// memo 값이 있어도 없어도 잘 동작한다
console.log(_reduce([1, 2, 3, 4], useful_add, 1));
console.log(_reduce([1, 2, 3, 4], useful_add));

// 파이프라인 만들기

// 파이프 함수
// 일단 함수를 리턴한다
// 그 리턴받은 함수에 값을 넣으면
// reduce 함수가 동작하면서 함수들이 차례로 실행되게 된다
function _pipe() {
  var fns = arguments;

  return function(arg) {
    // arg 값을 넣지 않았을 때 사용
    if (arg === null || arg === undefined) {
      arg = 1;
    }

    return _reduce(
      fns,
      function(arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

function _go(arg) {
  const fns = _rest(arguments);

  return _pipe.apply(null, fns)(arg);
}

// 파이프 함수에 함수들을 담았음
var f1 = _pipe(
  function(a) {
    return a + 1;
  },
  function(a) {
    return a + 2;
  },
  function(a) {
    return a + 3;
  }
);

// 파이프 함수 실행, 인자값을 보내지 않으면 1로 계산된다
console.log(f1());
console.log(f1(1));

_go(
  1,
  function(a) {
    return a + 1;
  },
  function(a) {
    return a + 2;
  },
  function(a) {
    return a + 3;
  },
  console.log
);

// 위에서 만들었던 users에 _go 적용하기!

// 훨씬 읽기가 쉬워졌다
_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age >= 30;
    });
  },
  function(users) {
    return _map(users, _getr('name'));
  },
  console.log
);

// curry_r 을 적용해서 훨씬 더 간결하게 바꾸자
_go(users, _filter(user => user.age >= 30), _map(_getr('name')), console.log);

_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age < 30;
    });
  },
  function(users) {
    return _map(users, _getr('age'));
  },
  console.log
);

// curry_r을 정용해서 훨씬 더 간결하게 바꾸자
_go(users, _filter(user => user.age < 30), _map(_getr('age')), console.log);
