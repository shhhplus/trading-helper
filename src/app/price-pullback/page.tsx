'use client';

import { useCallback, useState } from 'react';
import { NavBar, Form, Button, Input, Divider, Footer } from 'antd-mobile';
import * as utils from './utils';

type Result = {
  input: Parameters<typeof utils.calc>[0];
  output: ReturnType<typeof utils.calc>;
};

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
          basePrice: '10.00',
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
              {result.input.basePrice / 100} 元
            </Form.Item>
            <Form.Item label="最高价涨幅 ">{result.input.maxPpts}%</Form.Item>
            <Form.Item label="卖出价涨幅">{result.input.sellPpts}%</Form.Item>
          </Form>

          <Divider>最高价</Divider>
          <Form layout="horizontal" mode="card">
            <Form.Item label="实际最高价">
              {result.output.max.price / 100} 元 ({result.output.max.ppts}%)
            </Form.Item>
            <Form.Item label="实际卖出价">
              {result.output.sell.price / 100} 元 ({result.output.sell.ppts}%)
            </Form.Item>
            <Form.Item label="回撤">{result.output.pullbackToMax}%</Form.Item>
          </Form>

          <Divider>最高价-1</Divider>
          <Form layout="horizontal" mode="card">
            <Form.Item label="实际最高价-1">
              {result.output.maxMinus1.price / 100} 元 (
              {result.output.maxMinus1.ppts}%)
            </Form.Item>
            <Form.Item label="实际卖出价">
              {result.output.sell.price / 100} 元 ({result.output.sell.ppts}%)
            </Form.Item>
            <Form.Item label="回撤">
              {result.output.pullbackToMaxMinus1}%
            </Form.Item>
          </Form>
        </>
      )}
      <Footer label="没有更多了" content="@ All rights reserved"></Footer>
    </>
  );
}
