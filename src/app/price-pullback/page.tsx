'use client';

import { useCallback, useState } from 'react';
import { NavBar, Form, Button, Input, Divider, Footer } from 'antd-mobile';
import * as utils from './utils';

type Result = {
  input: Parameters<typeof utils.calc>[0];
  output: ReturnType<typeof utils.calc>;
};

function FloatNumber(props: { children: number }) {
  return props.children.toFixed(2);
}

export default function PricePullback() {
  const [result, setResult] = useState<Result>();

  const onFinish = useCallback((values: any) => {
    console.log('values:', values);
    if (
      values.basePrice === undefined ||
      values.maxPpts === undefined ||
      values.sellPpts === undefined
    ) {
      setResult(undefined);
      return;
    }
    const params = {
      basePrice: Math.floor(parseFloat(values.basePrice) * 100),
      maxPpts: parseInt(values.maxPpts),
      sellPpts: parseInt(values.sellPpts),
    };
    const output = utils.calc(params);
    console.log('output:', output);
    setResult({
      input: params,
      output,
    });
  }, []);

  return (
    <>
      <NavBar backArrow={false}>价格回落</NavBar>
      <Form
        mode="card"
        initialValues={{
          basePrice: '10',
          maxPpts: '10',
          sellPpts: '8',
        }}
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            计算
          </Button>
        }
      >
        <Form.Item label="基准价(元)" name="basePrice">
          <Input type="number" placeholder="请输入" />
        </Form.Item>
        <Form.Item label="最高价涨幅 (%)" name="maxPpts">
          <Input type="number" placeholder="请输入" />
        </Form.Item>
        <Form.Item label="卖出价涨幅 (%)" name="sellPpts">
          <Input type="number" placeholder="请输入" />
        </Form.Item>
      </Form>
      {result && (
        <>
          <Divider>输入</Divider>
          <Form layout="horizontal" mode="card">
            <Form.Item label="基准价">
              <FloatNumber>{result.input.basePrice / 100}</FloatNumber> 元
            </Form.Item>
            <Form.Item label="最高价涨幅 ">
              <FloatNumber>{result.input.maxPpts}</FloatNumber>%
            </Form.Item>
            <Form.Item label="卖出价涨幅">
              <FloatNumber>{result.input.sellPpts}</FloatNumber>%
            </Form.Item>
          </Form>

          <Divider>最高价</Divider>
          <Form layout="horizontal" mode="card">
            <Form.Item label="实际最高价">
              <FloatNumber>{result.output.max.price / 100}</FloatNumber> 元 (
              <FloatNumber>{result.output.max.ppts}</FloatNumber>%)
            </Form.Item>
            <Form.Item label="实际卖出价">
              <FloatNumber>{result.output.sell.price / 100}</FloatNumber> 元 (
              <FloatNumber>{result.output.sell.ppts}</FloatNumber>%)
            </Form.Item>
            <Form.Item label="回撤">
              <FloatNumber>{result.output.pullbackToMax}</FloatNumber>%
            </Form.Item>
          </Form>

          <Divider>最高价-1</Divider>
          <Form layout="horizontal" mode="card">
            <Form.Item label="实际最高价-1">
              <FloatNumber>{result.output.maxMinus1.price / 100}</FloatNumber>{' '}
              元 (<FloatNumber>{result.output.maxMinus1.ppts}</FloatNumber>%)
            </Form.Item>
            <Form.Item label="实际卖出价">
              <FloatNumber>{result.output.sell.price / 100}</FloatNumber> 元 (
              <FloatNumber>{result.output.sell.ppts}</FloatNumber>%)
            </Form.Item>
            <Form.Item label="回撤">
              <FloatNumber>{result.output.pullbackToMaxMinus1}</FloatNumber>%
            </Form.Item>
          </Form>
        </>
      )}
      <Footer content="@ All rights reserved"></Footer>
    </>
  );
}
