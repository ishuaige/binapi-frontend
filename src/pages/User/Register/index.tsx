import Footer from '@/components/Footer';
import {ArrowRightOutlined, LockOutlined, MobileOutlined, SmileOutlined, UserOutlined} from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { history, Link } from '@@/exports';
import {getCaptchaUsingGET, smsCaptchaUsingGET, userRegisterUsingPOST} from '@/api/binapi-backend/userController';
import { randomStr } from '@antfu/utils';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Register: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<any>(null);

  React.useEffect(async () => {
    await getCaptcha();
    return () => {
      //return出来的函数本来就是更新前，销毁前执行的函数，现在不监听任何状态，所以只在销毁前执行
    };
  }, []); //第二个参数一定是一个空数组，因为如果不写会默认监听所有状态，这样写就不会监听任何状态，只在初始化时执行一次。

  /**
   * 获取图形验证码
   */
  const getCaptcha = async () => {
    let randomString;
    const temp = localStorage.getItem('api-open-platform-randomString');
    if (temp) {
      randomString = temp;
    } else {
      randomString = randomStr(
        32,
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      );
      localStorage.setItem('api-open-platform-randomString', randomString);
    }
    //携带浏览器请求标识
    const res = await getCaptchaUsingGET({
      headers: {
        signature: randomString,
      },
      responseType: 'blob', //必须指定为'blob'
    });
    let url = window.URL.createObjectURL(res);
    setImageUrl(url);
  };

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    console.log(values)
    if (userPassword !== checkPassword) {
      message.error('两次输入密码不一致');
      return;
    }
    try {
      const signature = localStorage.getItem("api-open-platform-randomString")
      // 注册
      const res = await userRegisterUsingPOST(values,{
        headers: {
          "signature": signature
        },
      });
      console.log(res)
      if (res.data) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        history.push('/user/login');
        return;
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Bin API"
          subTitle={
            <>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>
                <b>一个丰富的API开放调用平台</b>
              </p>
            </>
          }
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            centered
            items={[
              {
                key: 'register',
                label: '用户注册',
              },
            ]}
          />
          {status === 'error' && <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />}
          {
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <SmileOutlined className={styles.prefixIcon}/>
                }}
                placeholder={'昵称：昵称小于7个字'}
                rules={[
                  {
                    required: true,
                    message: '昵称是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'账号：账号应大于4个字小于13个字'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码: 至少8位'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'确认密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="phoneNum"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="phoneCaptcha"
                // 手机号的 name，onGetCaptcha 会注入这个值
                phoneName="phoneNum"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                  {
                    pattern: /^[0-9]\d{4}$/,
                    message: '验证码格式错误！',
                  },
                ]}
                onGetCaptcha={async (phoneNum) => {
                  //获取验证成功后才会进行倒计时
                  try {
                    const result = await smsCaptchaUsingGET({
                      phoneNum,
                    });
                    if (!result) {
                      return;
                    }
                    message.success(result.data);
                  }catch (e) {
                  }
                }}
              />

              <div style={{ display: 'flex' }}>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <ArrowRightOutlined className={'prefixIcon'} />,
                  }}
                  name="captcha"
                  placeholder={'请输入右侧验证码'}
                  rules={[
                    {
                      required: true,
                      message: '请输入图形验证码！',
                    },
                    {
                      pattern: /^[0-9]\d{3}$/,
                      message: '验证码格式错误！',
                    },
                  ]}
                />
                <img
                  src={imageUrl}
                  onClick={getCaptcha}
                  style={{ marginLeft: 18 }}
                  width="100px"
                  height="39px"
                />
              </div>
            </>
          }

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link
              style={{
                marginBottom: 24,
                float: 'right'
              }}
              to={'/user/login'}
            >
              已有帐号，去登陆！
            </Link>
          </div>

        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
