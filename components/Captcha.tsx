import React, { useRef, useEffect, useCallback } from 'react';
import * as S from './style';
import { originalCharacter, randomColor, randomNum } from '../libs/utils'
import { isFunction } from 'lodash';
import cs from 'classnames';
//https://github.com/WebEngineerLi/react-captcha
export interface ICaptchaProps {
  /**
   * 高度
   */
  height?: number
  /**
   * 宽度
   */
  width?: number
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 字符个数
   */
  charNum?: number
  /**
   * 字体大小
   */
  fontSize?: number,
  /**
   * 点击验证码的回调函数, 用来传递验证码（会在页面初始加载和点击验证码时调用）
   * @memberof ICaptchaProps
   */
  onChange: (captcha: string) => void
  /**
   * 样式名
   */
  className?: string,

}

const Captcha: React.FC<ICaptchaProps> = ({
  height = 40,
  width = 100,
  bgColor = '#DFF0D8',
  charNum = 4,
  fontSize = 25,
  onChange,
  className,
}) => {

  const canvas = useRef<HTMLCanvasElement | null>(null)

//   useEffect(() => {
//     onRef(canvas)
//   }, [])

  const generateCaptcha = useCallback(() => {
    console.log(height)
    const rfontSize=Math.min(Math.floor(height/3*2), fontSize)
    let checkCode = '';
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath()
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < charNum; i++) {
          const charGap = Math.round(width / charNum)
          const offset = Math.round(charGap / 2) - 6;
          const code = originalCharacter[randomNum(0, originalCharacter.length - 1)];
          checkCode += code;
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.strokeStyle = randomColor();
          ctx.font = `${rfontSize}px serif`;
          ctx.rotate((Math.PI / 180) * randomNum(-5, 5));
          ctx.strokeText(code, offset + i * charGap, height / 2 + 8);
          ctx.beginPath();
          ctx.moveTo(randomNum(0, width), randomNum(0, height));
          ctx.lineTo(randomNum(0, width), randomNum(0, height));
          ctx.stroke();
          ctx.restore();
        }
        return checkCode;
      } else {
        return ''
      }
    } else {
      return ''
    }

  }, [])

  const handleClick = useCallback(() => {
    if (isFunction(onChange)) {
      const captcha = generateCaptcha();
      onChange(captcha)
    }
  }, [onChange])

  useEffect(() => {
    if (isFunction(onChange)) {
      const captcha = generateCaptcha();
      onChange(captcha)
    }
  }, [])

  return (
    <S.SCaptcha
      className={cs('react-captcha', className)}
      onClick={handleClick}
      height={height}
      width={width}
      ref={canvas}
    />
  )
}

export default Captcha