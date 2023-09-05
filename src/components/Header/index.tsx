'use client'
import Image from "next/image"
import { NavigationMenuDemo as NavigationMenu } from '@/components/NavigationMenu'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { User2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation'


function Header() {
    const [cookieKey, setCookieKey] = useState<any>("");
    const [coinNumber, setCoinNumber] = useState<any>("");
    const pathName = usePathname()


    const handleLogin = () => {
        const hasCookieAlready = setSessionCookieOnce('sessionID')
        console.log({ hasCookieAlready })
        setCookieKey(hasCookieAlready)
    }

    function fetchUserCoins() {
        try {
            var sessionCookie = getSessionCookie('sessionID');
            console.log(sessionCookie)
            fetch(`https://presentation.popclub.co.in/api/get-available-coins?key=${sessionCookie}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic cGwtcHJvZDpwbEAyMHR3ZW50eXR3bw==',
                }
            }).then((res) => res.json()).then(data => setCoinNumber(data))
        } catch (err) {
            console.log("Oops! An error has occurred");
        }
    }

    function setSessionCookieOnce(cookieName: any) {
        var sessionCookie = getSessionCookie(cookieName);
        console.log('getSessionCookie')
        console.log(sessionCookie)

        if (sessionCookie.length == 0) {
            console.log('setSessionCookie')
            setSessionCookie(cookieName)
        }
        else {
            console.log('fetchUserCoins')
            setCookieKey(sessionCookie)
            fetchUserCoins();
        }
    }

    function setSessionCookie(cookieName: any) {
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
        var length = 32;
        var randomString = ''

        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length)
            randomString += characters.charAt(randomIndex)
        }
        var cookieString = cookieName + '=' + randomString + ';'
        document.cookie = cookieString
        setCookieKey(randomString)
    }

    function getSessionCookie(name: string) {

        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            if (cookie.indexOf(name + '=') === 0) {
                return cookie.substring(name.length + 1, cookie.length);
            }
        }
        return '';
    }

    // if a cookie already exists
    useEffect(() => {
        console.log('load')
        setSessionCookieOnce('sessionID')
    }, [])

    useEffect(() => {
        if (cookieKey) {
            try {
                fetch(`https://presentation.popclub.co.in/api/get-available-coins?key=${cookieKey}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic cGwtcHJvZDpwbEAyMHR3ZW50eXR3bw==',
                    }
                }).then((res) => res.json()).then(data => setCoinNumber(data))
            } catch (err) {
                console.log("Oops! An error has occurred");
            }
        }
    }, [cookieKey])

    console.log({coinNumber})

    return (
        // if header animation has been removed, add "fixed" class to fix it
        <main className="w-full fixed z-[100]">
            <div className="bg-[rgba(255,255,255,0.8)] backdrop-blur h-[10vh] flex items-center justify-center ">
                <div className="max-w-[1350px] w-full">
                    <div className="flex justify-between">
                        {/* //logo section */}
                        <div className="flex items-center">
                            <div>
                                <Link href="/">
                                    <Image
                                        src="/poplogo.svg"
                                        width={70}
                                        height={70}
                                        alt="Popclub logo"
                                    />
                                </Link>
                            </div>
                            {/* // remaining section */}
                            {pathName !== "/partner-with-pop" && (
                                <div className="px-6">
                                    <NavigationMenu />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-3">
                            <div>
                                {pathName !== "/partner-with-pop" && (
                                    <Image
                                        src="/popcoin.svg"
                                        width={25}
                                        height={25}
                                        alt="Popcoin"
                                    />
                                )}

                            </div>
                            {pathName !== "/partner-with-pop" && (
                                <div>{coinNumber?.data?.coins}</div>
                            )}

                            {pathName !== "/partner-with-pop" && (
                                <div className="btn-container-desktop-modal">
                                    <Dialog>
                                        <DialogTrigger>
                                            <User2 className="mt-[4px]" onClick={() => handleLogin()} />
                                        </DialogTrigger>
                                        <DialogContent className="lg:w-[340px!important] lg:p-2 lg:rounded-3xl h-[90vh] z-[110]">
                                            <DialogDescription>
                                                <div className="">
                                                    {/* // disable z-index from header and it works */}
                                                    <iframe className="mx-auto h-[80vh] lg:rounded-xl" width="100%" height="600px" src={`https://coins.mypopcoins.com/?brand=mypopin&key=${cookieKey}`}></iframe>
                                                </div>
                                            </DialogDescription>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}

                            <Link href="/">
                                <Button className={`${pathName === "/" ? `bg-[#F56651] text-white hover:bg-[#F56651] hover:text-white border-0` : `bg-white text-black`}`} variant="outline">I am a Customer</Button>
                            </Link>
                            <Link href="/partner-with-pop">
                                <Button className={`${pathName === "/partner-with-pop" ? `bg-[#F56651] text-white  hover:bg-[#F56651] hover:text-white border-0` : `bg-[white] text-black`}`} variant="outline">I am a Brand</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <hr /> */}
        </main>
    )
}

export { Header }