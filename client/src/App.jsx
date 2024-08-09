import React, { useEffect, useState, useMemo, createElement } from 'react'
import "./App.css"
import {io} from "socket.io-client"
import { Box, Avatar, Button, Container, TextField, colors } from '@mui/material';
import { MdEmojiEmotions } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { IoIosShareAlt } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";


function App() {
  const socket=useMemo(()=>io("http://localhost:3000"), []);
  const names=[ {
                name: "Robert Downey jr.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmnDv9-LrAurxTcEzWQfNnMqcx0bM-WcnivQ&s"
                },

                {
                 name: "Cristiano Ronaldo",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/640px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
                },

                {
                  name: "Lionel Messi",
                  image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMVFRUWGBobFhcYFxYaGBcYGhcXGRgdGRgYHSggGBomGxcYITEiJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGi0eIB0tLS0rLS0rLS0rLS0tLSstLS0tLS0tLS0rLS0rLSstKy0tLS0tLS0tKys3Ny43LS0tK//AABEIAQAAxQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCAQj/xAA8EAABAwIDBAgFBAEEAQUAAAABAAIRAyEEBTESQVFxBiJhgZGhsfAHEzLB0SNC4fEUQ1JicqIIM1OCwv/EABkBAAMBAQEAAAAAAAAAAAAAAAABAwIEBf/EACMRAAICAgICAwEBAQAAAAAAAAABAhEDIRIxBEETIlFhUjL/2gAMAwEAAhEDEQA/ANxQhCABCEIAEIQgAXhKHOi5WX/FHp5/jn/GouILmnae0iQTYAHlOl0mxpWaJjc3oUS0VarGF30hzgJ5SqL0h+KFOjVNOlT22tkbZMNcRGnZfVZIMXUeNuqS4gu2S65DSQdTeJ9VC47GbToJI4d0x6rPI3xS7Ned8YSAT8gG1m7UEG1ja41MhO8u+M2HdRJq0HtrD9jTLXcdlx05FYOzEPjQkb/sladQAkwD2SeCYqRvWO+KGHrYR7qL3UqwLeqR1okSRu+me9M8p+K7g1prUg9os5zSA8EC52DY2krEaRa8kgEEX4H+k8pOAu1xBFx4pWNJH1FhOk+EqU2VBiKYa8At2nNab8QTIKlaVVrgC0gg6EEEHkQvkR7JFzBnqn7disXRDpbiMC8OpuJb++mSdh3duPK6di4H04hU3ox8Q8Niy1jj8qqdGu+kn/i7TuMaq4p2Zao9QhCYgQhCABCEIAEIQgAQhCABCEIAEIXhQBC9M8f8jBV6lpDCGh2hcRYdq+aBRfXcC4kiRck2gib79CFpnxY6RNxFWnh6VSadOTUjQ1NGg8Yj/wAiqHiKgpNtbUj8+aw2VgtDfNcRDXbOhMD0+yrJlzoJUvmOIBaI8O9QTTdKI5M8bUIXTCYXVemBsniNN9+Pvchp1jvHhotmBejiI3f3zS9OtJ7L/wAqPa3XhCVokAieKTGiapNESN40PEHemgkOJFr3ndK6pP6vL0TnGUQ5ocN4grJpjjBVdpuzvGnGJv75LVehnxHbSY2hi9p2zAZVHWMTo8EzadeAWOYIFtUSdZnwP4UnTd1hHZ3wf4R0wq1s+pcPXa9oewhzXCQRcEHglFmXwpzkicM4y1zfmUp3G+23ykDmtMW07JNUz1CEJiBCEIAEIQgAQhCABCEIAFRPiz0i/wAbDCkx0VMQdgRMhoguIjS1u9W3OM0pYakatWo2m0fudxOlhcr5y6X9JK+Mq7dZ9OGSBsD9smI4jfKTNJDTDHZh1TU3g3gce25Kic0xhc89swPReV8Y2rYd/wBV43aJr8g1XWBgaad+qw+yq60IuqWI7fIhNQLhS/8AhFpgjUGw7T/C5bgzuCOQcWMyJNwuqTI0/j+VIswRsY13HclGYEg3t6IsOJDuw8XG/dwSbWwVazlTTuPMcuC9qZNLZjWB36I5D4FZZV1CkctxUgsN408CR6FJV8uI3cU1ZTcwk8kdippkkKgEk7oJ/wCuk+fkE6dXFzPEeEqFqPMzxF/CD77ENrWIJ3yUAXTo7mzqRbUaetSeCPWD2H7r6FyPN6WKpNq0nBwIEgatdAJBG4iV8r5fiYkQYdBBOvD7+St/wqzupQxzG1Oo2p+m4H6ToAZ4gx3FOJiaPolC8C9WyYIQhAAhCEACEIQALwlepvj6ZdTe0TJaQIMG447kAYR8VenYxLzh6bf0qTjJIEvIteRYSLQbrMa+IdGzffO83NtVK9KMufh8Q+lUABBkgPD9b6gm91H0myZiZOvAyPvCyUo8yzK31akAHtWgZf0XaAJ8d6X6FZS1jNqPq05K2spXXLly7o9DBgVWysPyGmNROscY3L3D5GxxG00W7FYq2G2uxKU8MBuUubOj4kRZyGjs2YCo9+SNmwi6t7WW0SP+NdL5GP4okDQycDcn9PKmbMRvnlZSfy0FLmw+NENiOjtJ+7eSe9QGZ9C5ksI/hXRzlwXJrJITwxZmNfoy9syNVAZpljmTAMLaKlNrtQofMsna8ERB3Kkcz9kcnjKtGQNrlrSB38f6TzBZk8QDoGmON4EzyTzPctOHfoB2kTCbUKe0C4B0X6zt9o07ZXWnas8+UWnTPpL4YZy3E4GnD3OdT6jw7UEC3MEQVblkHwGoUy2rUG38wQHTIZB0vMONuFlr62SfYIQhAgQhCABCEIAEhjp+W+Ndk7p3cN6XXhQB8l9JGk1akyCCZluzF7jZ3XR0ey01Xtb+3av5fhSXSSK2LxD7maj9nhG24DnYWU30Wo7L4AE+nv7KUnSOiEbkXvC4MNbAG5ctbdPKAskHtuuKR62P8CF3TC4Ll5tKdlaHOzKDT7Emx43odUTMnqTcvPmapJxSGgISZ1XTnLxtyg0GwF6+n4pRgCXqbtFtE5MpvTrKRUo7YF274WZ7LgASZbOnA3iy3rMcMH0nAiZaViGPobJe06h092hXVifo87yI7s17/wBP7f0cSd20z0Pl2LW1kvwBd+liRMkOpnuIdH3WtLoRwvsEIQmIEIQgAQhCABRvSLFmjha9QaspPI5hpjzUkqv8SnEZfWDTBdsN5y9oISY12YZl+G2r3N5PadVbejWDJeJGl/fom+T5d1fzqSrlkuBLG34flQkztxxocUWeqZVxBKkydkqNxcEkyuWa0duN7EWBdhhSHzmg6+Cc08Q3iLrHEvYfLPFemke3xKdUwI1TinsnVa4mHMjC3tXBpKUdTaTHguXUQEuI+ZFGivNgp49oXLQEqNchsKeiVZKWcwLynYrSMSY5qU+pHEQsd6YZcW1nWtPmtpFwqR0swLXPPH3ftXRDTOLJtCPwGxmzi69I/wCpSBHNjh9nFbksD+GjP8fNaI/+Rr2z/wDQu/8Ayt8XUujgmqYIQhMwCEIQAIQhAAqz8QWTg3dj6Z1j94U/jMU2m0udMDgJPcAojM61PGYSsKZ2uqbRcOb1hIOlwEm/RqKffoo+V0gD399/YVoAAACreCAAaTvj35qxtdIB3LmZ3oa4qBvVTzvMIMA67hCteNaNm5HgoGpg2bwCptItFsp1bNS10wZCaPz9xibX3H7K2V2UNqNgOdwAk/x3qOx2Vn9uHA5uaPISmkhNP9HGU5mdk3J9+asOFxZcPJUljqlI9amWjiOsO+PuFP5VmIdA471iRWD/AEs7akFJ1cRquqQtKa1mkSp2U0I1scGyeajq2fNGgvuEpvmWKEQTHkqriazCSGvE8wqRiTlNrouNPP2kcPBOcHnLXEA3VEwuBryCDbz8VPZfh6gEFpnmTZa4onzky/0Hy0cFGdIcGHN2xrv5X9965yiuYg+EFSlW7T2haJso+WUPl4zC1P8AbVZ4FwafEOW5LHW0T86nF/1Gaaztt99y2GV0w6OLMqZ6hAQtkQQhCABCEIAbZgwGm6RMAnvAlUprXUyatE/U3Q6EHcQrxi/od/1PoVUKbw0Uxx179PfaufN2jt8V6a7RDVaYp0xBMatnduPpCmsOZY3kE0zOmPlmBv07TY9xsneGs0dymmXapjfMTfkq3m7H7OyDE/UW/UexvarLimyfdkhQwzG9Y69vuym3sqlSM/zXDYgYeq8E0tgGKbdYkSXu1cY9FThjnltNrDVbUBealQvlrmmCwNbFiLyd62+uGuJMTxsYUXVy6iY/TpyDM7I4qsZqiUsTb7I2jgnsawvl4c1pNus0wJniPNKPysU3tczR58DPkpqmy8mY4mUUxt1AYhrTYdvFYbLKOh45seCaZhV2MO5w1H4S1R1yuatIOouad/4UYvZSS+pnFHL3YgGtWfs05tu2k9/y6NGozDNw3XfptltNsEEguc42Bg6qfwmAbLSbGnYNOgPEDiVz0i6N08YduqTtbOz1dkSBpK6E17OZxl6Ktl3SehWdDadSlvlsEADUkaEclZsLjNjZcXNqU3fTVboCNQ8atPkmWR9FaeGqbTS4mCJJFgdYA36DvVip5KGy5hJc4y+btcSb8jfciVegjy9jzDNu0nfvtdO8RZrhwCb4OjAho2YMxMt7k5xLSQZESOe5JMGtkLgsQ2nWZUeOqx20YuYGkDfePFWfKs2xFavNm0ybMgadp4xdVzAYLbgn6R1ieJnqt5TfwUnhMyLMww+H3ODnOjeS10StKTtIw8a4t1bovgXq8C9XWeaCEIQAIQhADXMnRTdyjxsqpjQxnWc6B9grJn1XZoniSAOao1eu4WIJnRcnkPdHo+FBuLZ1SzBtekS2QC6L2Mh8EX7L8ipljbQq/QoFgkwAXgx27/srFh9TKxHotkVSGLhHv3dcsdCd4iko+tZTaorDYq4MOt+d1y4t4BNwCUuzDnglbN8EuxvWMlO8PTgAd5SL27JEpbEm1uCcRSS6QycblO8Oyafeo+pUBBXeBrHTgiPZvJH6jrF4Rp6wsY7jzTZrbQTB4KRrNGxKjhJCcnRLGrOqdCLz4FLgnjzH9apo5x4kFeCoVjkUeMkWnf6px9Q4Qm+HE66b0+Ahse4VIHPk0RjXllNzGkbXW2Ji7iTGusCFw3LXjE4Su6doEMd5kffxUD0nB/y6XWIaGkgXFybme4eCtfR/MQ9zGOMgEQeBBstL/oGmoWvwu4Xq8C9XceOCEIQAIQhAEb0hbNEzxHddU7DteHwWyO1XvH0PmU3MP7gQqrltFzXEOH0gjmuXPH7Jno+HkqEkRmY1NqnIN2O6wjvFuSdZZitoCdf5XGOaBthgsYLifJQ+CrFr72BsOQtM8dPNRiy0lZbZBEqLxQunYxAgckwxT5RM1i0zyg8Sl6uKgKObUXL+sYWLOhpNjilRdVMjd908qYNzWG4PG6rWf1qrG/oug7/4ULgc6xbD+rNZncKjfs4e5W4rROTaZdRhGmnO0NonQ811lWGl0KLfj2iO3ekc0zirQpl1Nm24jqtBiRpMnUdgumlsUpPj2T+LwFQTs3HAH0TTBb2uF2+wqNhs6zL/AN2s8NZP0AeQGqncgzR9dz6jxs7RsDrAAAnttPelONBjb6J2vTv2rim266qVbLinqpoteiZwdCAlq7rJLDVIamuMxHVPkuj0cUrbK/nJa+sxx0HVPKCfx4hSWUuBe1rB+4X36hQ2Fwbq1ZpBBDSdpvOLwd27uVswGGayuynTES4Fx4AXgcJ9FNJtoryUYNfwuoXq8C9XoHighCEACEIQAFRGb4Q/Uwa6x69ql0LMo8lRqE3F2ijYl+0PktEudbS89vYFC5nhzSe5huWGAY13g+hWo7KovTfDfrg6bbfMWJ7bQueeLirO3Hn5yqqI6liTsjknB6zZ9yosG54fj2E7y7EhwPZp22uuc6lo7LI1TWpmVNm8Hh2nsSGeYuGkbryqo6m5x13XPDgAO4+CSNuVEtmubSfXv9lQ2Jxz4uIMWHHiU7p4AuAJEcAfCY8EvRyHaqAlwgXk9n9BbWjLuRDV8zrsgNIdwDhN/Y80x/zq9R+29xJEgRYCNwHBWetk8V2SZaBu4kx+EnTycybaOcD4gyOFvRU5E3CR5gcdYbd5tJNhp/CkctxLWEzYTr+VB4rLnAkCRvjy+wXrmPZyMDksN2NNxLrTrB1wUvhaZlU3LMwc0wfYufBXTKawLTNv63LFbKc7Q8qvhR+ZV+o7TQxz92XGLxwLon2ffmk30xUNMbnPAPeQPMFask/0R6Mjb2nizw+/a0wr9kuHBeakR+YXGH6KUGVC9m02blodYn1HipulSDRAEBdUMddnJm8hSVRFEIQrHICEIQAIQhAAhCEACrPTnC7VJtT/AGG//UxPmArMmGeUtuhUbxasTVxaN43UkzMa77GOBgd38jzTTAVi23b5Tp6py8bDiPd4CYVQQDH9i38rgPWOswcH6mBp/PJQtPCvqmQ4tBP7Yv48E8zB52Ggb3X5XkepSmROAh03vrERuA97lpKtiu3QhiuitaA+jiqkjVjiD4SmArVqBaK3zwJu5jGubG6wvw3K8Uat9w/ldVzTcbxwFltT/TfBP+FGr9IcO0tAxFQmYO1RcA3W5sN8cV1Xz5jTDcXSMmCQDG+5kW09FcMTk2HcJkdoMfcKNrdGcMTJa08mt/C1oPjfqRV8RnuIe5wwp+YBsgOLDBMDaMndMwkmUcc4zUc0HeA0LRsHhKLGfSOyI9gJmaYkkWnjysk5pGOG+ysYWi6QCRYG43xHvvVkySsQwz57vcKJezZqTG9w7r/YHyT2nWGxaRIuOBmymxLR0SX1Ru09f7Vg6PYY1cTSjRh2ncCALDxIUHhaVtrgD671fehOALWOqn/UPV4ho/J9AtYo3MnnnxgWYL1CF3HmAhCEACEIQAIQhAAhCEACQxo/Tf8A9T6JdI4z6H/9T6JPoa7Mxz2hEPHM8vcqM2Q+YteVY8yp7TSBqqbXrGi69+tJtrJ/tcFbPW6QtWoF0kCS2wEa3v8AfuUZUxQY4tGu+++TKk8XiupII2nET2A3t4hVXMaRDjskzMk8OA596okTlItWDxZc0Rr718glcfVeDI/baONvfmojJKop7Mz1rDW5GvmrUWMc25F1OSpl4PktleqY8hzRtG5vy48krh8XMSTqQZ0j+wm2Kypzi4tjfF+f4KdZflBp7Idv0F03QqlZIf5B0b/tnstw3iyRdjmweMb5Tp1HZaI81A5iyDtGALiRv/H8JLYT+qBlXaqgky3Xs3A+V+9PwB8x3/lzjXkonKqRG0NSB1eQ48bSDyTva2SR+47/AAgcrlbaIqXskqFbaOzxt4m48QVq+QNAw9MD/askyRv6k/mVrmRn9BnI+pVMCpsj5W4ofoQhdJxAhCEACEIQAIQhAAhCEACSxX0O5H0SqSxP0u5H0SY12UWsZVR6RYWwMG3OFbayrudAFjmu1ExJ9yVw3s9dq4lOqYk79Gm17b+HIJviqw2QTuvHpK8xNzsukRpvB4Lg2EHh6f1CvRyN0SOX1rbTv23PMmBf35KWy/E7QJETutpB/HFVqpiIY1o0Bk9/9FSmWYiG35+J9YU5ItjmTmGzBpIbFoseEcu1KVMYDr479R/aqWZYotEjl2+4Ke4HESwE7wb8barNFPkHWNxjm2nv4dybBzSQ4zeRA3xr9imtbEazuNh2Tv46JvTxNoFryCLwez3vW4ojOeyVZVDZ2XaXHbb8heRtHa0kDqzprFyo3BG4J7wd8zoCeEBPsLUBMuvFr3jX7ptGY7LLklPrWJOnLgtS6PH9FvYSPNZnkhtP8D+bwtC6N42nHydtvzLu2JG1sTG0BvEp4uw8lfQnUICF0nACEIQAIQhAAhCEACELP/iv0xbhcNUo0n/rvbHVN6bSDJJH0uIEDnKAEumnxawuCc6lSH+RWbYhpAptPBz737AD3LNML8TswxuMoU3VRTpPqsDqdJuyCCRYuMuI71nuEwdWu6GNLjvO4czoFovQjoKWVGV6zrsILWt0kG0nesSml2Wx4pSejT6o0VezTDh8t2jrPb7/ACrG8KKx1G/h710lcZ6foouOoEOLSDIvI4cROo/Cjq9MzJJNrGBBHMdyuWaYQm7YtuPC9uyDKhqlEgkFpi2kEDcZ/lUjIhOJWAWt1u0T2bjFucJSjjDpExbnwTzH4INgiLXHPkdVFurbNgPyt6ZLaFcXi9oQYm0pRuJhotp78NExnfa49966qO/G60hCiPkLvxUAm06a9m/y80qxh2WRMXdxg2mN+/yXVDCtkzxvbX3+VKYag4iWiIFzbujtT6FTY2qtjcOMCRbtkKSymlLoIAHkCI8bppTwkmSbXkk91vfJT2WYcFthpp73KbZWCJ7LKcxAEC35PNUv4t4qpQr4OtRc6nUYH7L2yCILCO6SbaFX3A0dnvUP07ygV6IdHWpyRytI+/clGXF2byQ5RoddGfjPTfTZ/lUXNdo59OHNniWmCOQlaTkud0MWz5mHqtqN3wbt7HN1aea+VqlD5VRzNxbPr+F50dz2thKza1F5a8Hthw4PH7m30Prddi2rPMlHi6PrtCzrIPirSqtBxFCrRaf9VoL6M75cBLfAq95fmFKuwPo1GVGH9zHAjy0PYgVDpCEIEeKPzrOqGEZ8ytUDBo0auceDWi7jyUbnXSPY2m0dkub9dV5ijS/7H97v+Le8tWX5p09oU6jnU2PxVQ2dXe4NnspjZOy21gABzQUhjvbdIc9J/i7UqNLMIw0RJBqPgvj/AIjRh8dFmuOrmo1xcS4umSSSSTrJOuqb43MTXqPqm229zo4SZjuHouab5BC1Rl0no0vI8tY2jT2AA0tBt2ib8VcMJhgGAeKp/QDF/MwwafqpEtPLVvkY7lesPdq82afJo9aMk4Jo4OiaVWBwNk7SIbrf3CDSITEUy02N+HaExe287IjeN48D6eCsGIpgzI7VH43CtcJ9++SaYnGyBx2Ga4XmDwI8wRKgMVl8WieyNO8q21sMwi7ec+7eSZVMHAsBbsPvRUTJOFlUZk52gO896XblsOIItPDstb3oVZadISLcfRc1qHWt49m5PkZ+MisHgYIsSLGIGvf/ACn9a4LQIAEXNhz4nsunlGlpYa+/cJTFUZEHuWbN8COwtDbtcxvP4Cs2V0Yb74Jhl+DA0ESp/D04EBKTNxjQth6cCTxXuIaHAjcQ6fBKU9Fy8dUng0+QKwNmJdJobiIG6mPVyr9MKY6R1trEVTwhvgAPWVFMC78eoo8vK7my0dG+l9bBt2GBj2OMlrwbmALEG1uwq05fnWDrPFSjVqZbiN5af0XHti0TuMBMPhcaR+e2r8sh2xDX7N/rmA7XUKz5v0Bwta9KaD+LZLO9hMeBCG1Z048U5QTW/wCFgwfSTM6TQH0KOLH7atOoKe0P+TTaeVkLOH9HM0wh2MO6o5hvNKpsttxa5wg+PNCDDxR/yz//2Q=="
                }, 

                { name: "Lewis Hamilton",
                  image: "https://cdn-4.motorsport.com/images/mgl/YEQ1pGwY/s8/lewis-hamilton-mercedes.jpg",
                }, 

                {
                  name: "Charles Lecrec",
                  image: "https://cdn-6.motorsport.com/images/mgl/YMdm7R32/s8/charles-leclerc-ferrari.jpg"
                }  ];
  const [username, setUsername]= useState("DefaultGuy");
  const [image, setImage]= useState("https://pbs.twimg.com/profile_images/1304752924610850817/4eIlt6oT_400x400.jpg");


  useEffect(() => {
    //Asking for Name from user
    // appendGeneralMessage(`You Joined`);
    giveRandomName();

    // const name=prompt("Whats Your Name");
    socket.on("connect", ()=>{  
      // appendGeneralMessage(`You Joined`);
      
    })
    //Sending Name of User
    socket.emit("new-user", name);

    //User Greeting on Connection
    socket.on("user-connect", data=>{
      document.getElementById('green-dot').style.display= "block";
      // appendGeneralMessage(`${data} Connected`);
    })

    //Recieve Message
    socket.on("message", (data)=>{
      // appendMessage(`${data.name}: ${data.message}`);
      appendMessage(data.message);
    })

    socket.on("personal-message", (msg) => {
      appendYourMessage(msg);
    })

    socket.on("user-disconnect", data=>{
       document.getElementById('green-dot').style.display= "none";
      //  appendGeneralMessage(`${data} Disconnected`);
    })

    //On disconnect
    return () => {
      socket.disconnect();


    }
  }, [])

  const [mssg, setMssg] = useState("");

  //Function to Append Message in text Area of other person
  function appendMessage(message)
  {
    const messageContainer=document.getElementById("actual-message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("otherMessage");
    messageElement.innerHTML=`<div class="inner-message-other">${message}</div>`;
    messageContainer.append(messageElement);
    scrollToBottom(messageElement);
  }

  //Functio to append Message in your chat
  function appendYourMessage(message)
  {
    const messageContainer=document.getElementById("actual-message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("myMessage");
    messageElement.innerHTML=`<div class="inner-message-personal">${message}</div>`;
    messageContainer.append(messageElement);
    scrollToBottom(messageElement);

  }

  //function to append general messages
  function appendGeneralMessage(message)
  {
    const messageContainer=document.getElementById("actual-message-area");
    const messageElement=document.createElement('div');
    messageElement.classList.add("generalMessage");
    messageElement.innerHTML=`${message}`;
    messageContainer.append(messageElement);
    scrollToBottom(messageElement);
  }

  //Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(mssg=="")
    {
      alert("Cannot Send Empty Message");
      return;
    }

    var message=mssg;
    
    socket.emit("chat-message", message)
    setMssg("");
    
  }

  //function to temporarily give random name to user
  function giveRandomName(){
    const random=names[(Math.floor(Math.random()*names.length))];
    setUsername(random.name);
    setImage(random.image)
    
  }

  //function to scroll in view
  function scrollToBottom(targetElm){
      targetElm.scrollIntoView()
  }
  return (

    
      <div className='screen'>
        <form onSubmit={handleSubmit}>
          <div id='message-area' className='message-area'>
            <div className='info-bar'>
              <div className='info-bar-left'>
              <div id='green-dot'></div>
                <Avatar className='avatar' src={image} sx={{ width: "4.5rem", height: "4.5rem" }}>
               
                </Avatar>
                <div className='name'>{username}</div>
              </div>
              <div className='info-bar-right'>
              <HiMiniVideoCamera className='info-bar-icon'/>
              <IoIosShareAlt className='info-bar-icon'/>
              <CiMenuKebab className='info-bar-icon'/>

              </div>
             
            </div>
            <div id='actual-message-area'></div>
            <div className="message-input">
          <MdEmojiEmotions className='icon'/>
          <input placeholder='Enter Your Message' className="input" type='text' value={mssg} onChange={(e)=>setMssg(e.target.value)}></input>
          <GrGallery className='gallery-icon'/>
          <Button className='send_bttn' type="submit"> <IoSendSharp className='icon'/></Button>
         
          </div>
          </div>
          
        </form>
      </div>
  
  )
}

export default App
