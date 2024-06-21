import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function Footer() {
    const SERVER_HOST = 'http://localhost:8080' //env

    const [twitterUrl, setTwitterUrl] = useState('')
    const [telegramUrl, setTelegramUrl] = useState('')
    const [pumpfunUrl, setPumpfunUrl] = useState('')
    const [tensorUrl, setTensorUrl] = useState('')

    const homeBtnState = useSelector((state) => state.homeBtn)
    const isHomeBtnVisible = homeBtnState.isHomeBtnVisible

    useEffect(() => {
        ;['twitter', 'telegram', 'pumpfun', 'tensor'].forEach(async (e) => {
            await fetchUrlFromServer(e)
        })
    }, [])

    async function fetchUrlFromServer(name) {
        const resp = await fetch(SERVER_HOST + '/urls/get/' + name)
        const url = await resp.text()
        if (name === 'twitter') {
            setTwitterUrl(url)
        }
        if (name === 'telegram') {
            setTelegramUrl(url)
        }
        if (name === 'pumpfun') {
            setPumpfunUrl(url)
        }
        if (name === 'tensor') {
            setTensorUrl(url)
        }
    }

    return (
        <div
            className={
                'fixed bottom-0 z-20 mb-[1%] flex h-[6.5%] w-full justify-center max-laptop:mb-5'
            }
        >
            <div id={'footer-panel'} className={'flex w-[67%] justify-between'}>
                <div id="left-icons" className={'flex gap-4'}>
                    <a href={twitterUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/footer/twitter.png'}
                        />
                    </a>
                    <a href={telegramUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/footer/telegram.png'}
                        />
                    </a>
                </div>
                {isHomeBtnVisible ? (
                    <Link to={'/'} className={"flex items-center justify-center"}>
                        <img
                            className={'footer-icon w-[60%] mt-[1%] max-laptop:mb-[-1em]'}
                            src={'images/footer/home.png'}
                        />
                    </Link>
                ) : (
                    <div />
                )}
                <div id="right-icons" className={'flex gap-3'}>
                    <a href={pumpfunUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/footer/pill.png'}
                        />
                    </a>
                    <a href={tensorUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/footer/tensor.png'}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
