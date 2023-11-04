'use client';

import { useRouter } from 'next/navigation';
import { NavBar, List } from 'antd-mobile';

// import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <NavBar backArrow={false}>Trading helper</NavBar>
      <List mode="card" header="全部功能">
        <List.Item onClick={() => {}}>TODO 1</List.Item>
        <List.Item onClick={() => {}}>TODO 2</List.Item>
        <List.Item onClick={() => {}}>TODO 3</List.Item>
        <List.Item onClick={() => {}}>TODO 4</List.Item>
        <List.Item onClick={() => {}}>TODO 5</List.Item>
        <List.Item
          onClick={() => {
            router.push('/price-pullback');
          }}
        >
          价格回落
        </List.Item>
      </List>
    </>
  );
}

