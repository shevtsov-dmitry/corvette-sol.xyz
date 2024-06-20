import { resolve } from 'chart.js/helpers'
import { useEffect, useState } from 'react'

export function Footer() {
    const SERVER_HOST = 'http://localhost:8080' //env

    const [twitterUrl, setTwitterUrl] = useState('')
    const [telegramUrl, setTelegramUrl] = useState('')
    const [pumpfunUrl, setPumpfunUrl] = useState('')
    const [tensorUrl, setTensorUrl] = useState('')

    useEffect(() => {
        ['twitter', 'telegram', 'pumpfun', 'tensor'].forEach(async (e) => {
            await fetchUrlFromServer(e)
        })
    }, [])

    async function fetchUrlFromServer(name) {
        const resp = await fetch(SERVER_HOST + '/urls/get/' + name)
        console.log(resp.status)
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
                'fixed bottom-0 z-20 mb-[1%] flex h-[6.5%] w-full justify-center'
            }
        >
            <div id={'footer-panel'} className={'flex w-[67%] justify-between'}>
                <div id="left-icons" className={'flex gap-4'}>
                    <a href={twitterUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/welcomePage/twitter.png'}
                        />
                    </a>
                    <a href={telegramUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/welcomePage/telegram.png'}
                        />
                    </a>
                </div>
                <div id="right-icons" className={'flex gap-3'}>
                    <a href={pumpfunUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/welcomePage/pill.png'}
                        />
                    </a>
                    <a href={tensorUrl}>
                        <img
                            className={'footer-icon'}
                            src={'images/welcomePage/tensor.png'}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
