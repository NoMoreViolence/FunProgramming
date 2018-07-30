// 컬렉션 중심 프로그래밍 의 4가지 유형과 함수

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

// 1 수집하기 - map, vales, pluck
// 2 거르기 - filter, reject, compact, without
// 3 찾아내기 - find, some, every
// 4 접기 - reduce, mix max, groupBy, countBy

/* 예전 함수 정의해놓음 */
const _curry = fn => {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(a, b);
        };
  };
};

const _curryr = fn => {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(b, a);
        };
  };
};

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

function _filter(list, predi) {
  var new_list = [];
  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}

// 이 함수도 each 함수를 이용한 것으로
function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val, key) {
    new_list.push(mapper(val, key));
  });
  return new_list;
}

function _is_object(obj) {
  return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

var _length = _get('length');

function _each(list, iter) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
}

var slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  return memo;
}

function _pipe() {
  var fns = arguments;
  return function(arg) {
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
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

var _map = _curryr(_map),
  _each = _curryr(_each),
  _filter = _curryr(_filter);
/* 예전 함수 정의해놓음 */

//
//
//
//
// 1 수집하기 - map
console.log('map 복습');
console.log(_map(users, val => val.name));

//
//
// values
// 배열의 각 요소의 객체에서 value 만을 수집하는 함수
const _identity = val => val;
// map 함수는 _curryr로 한번 더 감싸져 있기 때문에 _identity로 함수만 먼저 넣어도 사용 가능하다
const _values = _map(_identity);

// console.log(_keys(users[0]));
console.log('_values 함수');
console.log(_values(users[0]));

//
//
// pluck
// 배열이 주어지면 그 배열의 어떤 key의 value 만을 수집하는 함수
const _pluck = (data, key) => _map(data, _get(key));
console.log('_pluck 함수');
console.log(_pluck(users, 'age'));

//
//
//
//
// 2 거르기 - filter
console.log('_filter 함수');
console.log(_filter(users, user => user.age > 30));

//
//
// reject
// fn을 받고, 그 후 다시 val 이라는 값을 받아 !fn(val)을 리턴해주는 함수
const _negate = fn => val => !fn(val);
const _reject = (data, predi) => _filter(data, _negate(predi));
console.log('_reject 함수');
console.log(_reject(users, user => user.age > 30));

//
//
// compact
// _identity 함수로 null undefind 0 과 같은 필요없는 값들을 전부 제외시키는 함수
const _compact = _filter(_identity);
console.log('_compact 함수');
console.log(_compact([1, 2, 3, null, 0, {}]));

//
//
//
//
// 3 찾아내기 - find
// 조건식이 맞으면 해당 value를 리턴함,
// 조건에 부합하는 아무 값이나 찾고 싶을 때 유용
const _find = _curryr((list, predi) => {
  const keys = _keys(list);

  for (let i = 0; i < keys.length; i++) {
    const val = list[keys[i]];
    if (predi(val)) return val;
  }

  return list;
});

console.log('_find 함수');
console.log(_find(users, user => user.age > 30));
console.log(_get(_find(users, user => user.age > 30), 'name'));

//
//
// find_index
// 번호를 리턴
const _find_index = _curryr((list, predi) => {
  const keys = _keys(list);

  // for 문을 돌면서 조건식에 부합할 경우, 그 번호를 리턴
  for (let i = 0; i < keys.length; i++) {
    const val = list[keys[i]];
    if (predi(val)) return i;
  }
  return -1;
});
console.log('_find_index 함수');
console.log(_find_index(users, user => user.age > 30));
console.log(_find_index(users, user => user.age > 50));

//
//
// some
// 조건 식 중 하나만 만족해도 true
const _some = (data, predi) => {
  predi = predi || _identity;
  return _find_index(data, predi) !== -1;
};

console.log('_some 함수');
console.log(_some([0, null, false]));
console.log(_some([1, 2, 3, 4], num => num > 3));
console.log(_some([1, 2, 3, 4], num => num > 20));

//
//
// every
// 조건 식 을 모두 만족해야 true
// _negate 함수를 추가하면서 간단하게 구현이 가능하다
const _every = (data, predi) => {
  predi = predi || _identity;
  return _find_index(data, _negate(predi)) === -1;
};

console.log('_every 함수');
console.log(_every([0, 0, 1, 4]));
console.log(_every([1, 2, 3, 4]));
console.log(_every([1, 2, 3, 4], num => num > 0));
console.log(_every([1, 2, 3, 4], num => num > 20));

//
//
//
//
// 4 접기 - reduce

//
//
// min, max, min_by, max_by
const _min = data => _reduce(data, (a, b) => (a < b ? a : b));
const _min_by = _curryr((data, iter) => {
  return _reduce(data, (a, b) => {
    return iter(a) < iter(b) ? a : b;
  });
});

const _max = data => _reduce(data, (a, b) => (a < b ? b : a));
const _max_by = _curryr((data, iter) => {
  return _reduce(data, (a, b) => {
    return iter(a) < iter(b) ? b : a;
  });
});

console.log('_min 함수');
console.log(_min([1, 3, 4, 10, -1]));

console.log('_min_by 함수');
console.log(_min_by([-3, 5, 12, 10, 9], Math.abs));
// 30대 미망을 없애 놓고선 그중에 가장 나이가 작은 사람
_go(
  users,
  _filter(user => user.age > 30),
  _min_by(user => user.age),
  console.log
);

console.log('_max 함수');
console.log(_max([1, 2, 33, 10]));

console.log('_max_by 함수');
console.log(_max_by([-23, 1, 2, 4], Math.abs));
// 30세보다 많은 사람을 없애 놓고선 그중에 나이가 가장 많은 사람
_go(
  users,
  _filter(user => user.age < 30),
  _max_by(user => user.age),
  console.log
);

//
//
// groupBy, push
// obj, key, 그리고 값을 받고
const _push = (obj, key, val) => {
  (obj[key] = obj[key] || []).push(val);
  return obj;
};

const _group_by = _curryr((data, iter) => {
  return _reduce(
    data,
    function(grouped, val) {
      return _push(grouped, iter(val), val);
    },
    {}
  );
});

console.log('_group_by 함수');
_go(users, _group_by(user => user.age), console.log);

//
//
// countBy, inc

const _inc = (count, key) => {
  count[key] ? count[key]++ : (count[key] = 1);
  return count;
};

const _count_by = _curryr((data, iter) => {
  return _reduce(
    data,
    function(count, val) {
      return _inc(count, iter(val));
    },
    {}
  );
});

console.log('_count_by 함수');
_go(users, _count_by(user => user.age), console.log);
