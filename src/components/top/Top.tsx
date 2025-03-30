import Image from "next/image"
import {ReactHTMLElement, ReactNode} from 'react'
import { Button } from "@/components/ui/button"
import { Router } from "lucide-react"
import Link from "next/link"

type tileProps = {
  img: string
  imgAlt: string
  width: number
  height: number
  reverce?: boolean
  // props?: {
  //   [key: string]: string | number
  // }
  children?: ReactNode
}
type TileChildProps = {
  btn: string | ReactNode
  link: string
  children?: ReactNode
  linkProps?: {
    [key: string]: string | number | boolean
  }
}
const Tile = ({img,imgAlt,width,height,reverce,children}: tileProps) => {
  const style = reverce ? {
    clipPath: "polygon(0 0, 100% 0, calc(100% - 20rem) 100%, 0 100%)",
  } : {
    clipPath: "polygon(20rem 0, 100% 0, 100% 100%, 0 100%)",
  }
  return(<>
  <div className={`flex w-full h-80 bg-gray-500 ${reverce ? "flex-row" : "flex-row-reverse"}`}>
    <div className="bg-white w-[65%] max-w-[65vw]" style={style}>
      <Image
        src={img}
        alt={imgAlt}
        width={300}
        height={100}
        className={`h-full w-full m-auto object-cover`}
      />
    </div>
    <div className="m-auto">
      {children}
    </div>
  </div>
  </>)
}

const TileChild = ({btn,link,children,linkProps}: TileChildProps) => {
  return(
    <div className="text-center text-white text-2xl m-2">
      {children}
      <Button className="text-xl mt-2"><Link href={link} {...linkProps}>{btn}</Link></Button>
    </div>
  )
}

const Top = () => {
  return(<>
    <Tile
      img="/1037680.jpg"
      imgAlt=""
      width={200}
      height={100}
    >
      <TileChild btn="投稿する" link="/post">
        <p>
          あなたの作品を<br />
          世界中に広げよう
        </p>
      </TileChild>
    </Tile>
    <Tile
      img="/ssjs.png"
      imgAlt=""
      width={200}
      height={100}
      reverce={true}
    >
      <TileChild
        btn={<>
          <Image
            src="/ssjs.svg"
            alt="ssjs"
            width={48}
            height={24}
            className="inline-block"
          />を導入する</>}
        link="https://github.com/SketchShifter/sketchshifter_compiler"
        linkProps={{rel:"noopener noreferrer", target:"_blank"}}
      >
        <p>
          自分のWebで<br />
          Processing
        </p>
      </TileChild>
    </Tile>
  </>)
}

export default Top