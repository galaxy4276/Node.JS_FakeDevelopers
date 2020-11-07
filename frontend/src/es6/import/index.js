// function
import { getFormatDate } from '../common/function/_getFormatDate';

const notice = document.querySelector('.index-main__notice');
const news = document.querySelector('.index-main__department-news');

// 공지사항 데이터 fetch로 가져와 출력하기
fetch('http://localhost:8001/announcement')
  .then((res) => {
    // 데이터 받아오기
    return res.json();
  })
  .then((res) => {
    // 받아온 데이터를 최신순 5개로 정렬
    return res.splice(-5).reverse();
  })
  .then((res) => {
    // 정렬된 데이터 다듬어진 객체로 변환
    return res.map((item) => {
      return { title: item.title, date: getFormatDate(item.updatedAt) };
    });
  })
  .then((res) => {
    // 리스트 생성
    createUl(res, notice);
  });

// 학과 이야기 데이터 fetch로 가져와 출력하기
fetch('http://localhost:8001/community')
  .then((res) => {
    // 데이터 받아오기
    return res.json();
  })
  .then((res) => {
    // 받아온 데이터를 최신순 5개로 정렬
    return res.splice(-5).reverse();
  })
  .then((res) => {
    // 정렬된 데이터 다듬어진 객체로 변환
    return res.map((item) => {
      return { title: item.title, date: getFormatDate(item.updatedAt) };
    });
  })
  .then((res) => {
    // 리스트 생성
    createUl(res, news);
  });

// template
const createUl = (res, div) => {
  const ul = document.createElement('ul');
  for (let i = 0; i < res.length; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');
    const titleText = res[i].title;
    const dateText = res[i].date;
    a.href = '#';
    a.textContent = titleText;
    span.textContent = dateText;
    li.appendChild(a);
    a.classList.add('index-main__first__link');
    li.appendChild(span);
    li.classList.add('index-main__first__item');
    ul.appendChild(li);
    ul.classList.add('index-main__first__list');
  }
  div.appendChild(ul);
};

// component
