<template>
  <div style="padding: 100px 0">
    <div class="container">
      <div class="comment">
        <div class="comment__list">
          <div class="comment__item">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQQFBgcDAgj/xABDEAABAwMBBQUEBwUFCQAAAAABAAIDBAURBhIhMUFhEyJRcZGBobHRBxQjMkJSwTNjcoLhFTRi8PEWNkNTZHOSorL/xAAbAQABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADIRAAICAQMCBAQEBwEBAAAAAAABAgMRBBIxBSETQVFhIjJxkRQzobFCUoHB0eHwQxX/2gAMAwEAAhEDEQA/ANwQAIAEACABACEgIAZ192oreD9Zna12M7A3uPsT41ylwiG3UV1fMyvVesRvFHSn+KY49w+asR0v8zM6zqa/gj9yLm1PdZSdmZkY8I4x+uVKtPWirLX3vh4Grrxcnca6f/ywn+FD0IXqr3zJiNu9xbwrqgfzI8KHoH4m7+djmHUl1iP952x4SMBTHRW/Iljrr4+ZJUesZAQK2la4fmhOD6H5qOWm/lZZr6m1+ZH7Fht97oLhhsE4Eh/4b+670VedU48o0adVVb8rJDKjLAqABAAgAQAIAEACABAAgAQA3rKyCihdNUytjjHM8/JLGLk8IjssjXHdJlNuuqamqJjocwRfm/G4fp7Fdr06j3l3Ma/qE59q+yK+SS4ucSSeJKsGe23yIgQb11fSW+Lta6ojgby23cfIc/YmynGPzMlqpsueK1krdXrqijJFLSzTDk5xDAfiVXlq4+SNSvo1j+eWP1GX+30pP9wix/3Tn4Jn4t+hN/8AGh/P+g+pddUb3BtXRzweLmnbaPgfcnrVx80QWdHsXySTLFQ19JcIu0oqiOUDjsne3zHEe1WIzjNdjNtospeLFgc/HxTiEm7VqWroi2OfNRAPwuPeA6H5qCyiMuOxfo19lfaXdF1t1xprjCJKaQOH4m8C09QqU4ODwzapuhdHMGO00lBAAgAQAIAEACABADC8XSntlN2sxy4/cjHFxUldbm8IgvvjTHMjPrlcai5TmWpcTj7rBwaOnzWhCEYLCOeuvndLMhonEIIFK/eNWW+ijljpZW1NU3c1rd7Q7qenRV7NRGK+HuzS03TLbGnPtH9SgVc9TXzuqKqV0srhkk+HgByHRUHJyeWdHVVGuO2CwhskHiEA8RlACbOPukjokA60lVPS1DZaeR0MzeDmnGfmOiVSa4GzhGcdsllGhaX1My6YpKvZjrAO7j7svl4HotCm9T7Pk5zXdPdHxw+X9ixqwZZ3o6ueinE9NJsPHhzHgUkoqSwySu2Vct0C/wBjvMN0h5MnaO/Hn3jos+ypwfsdBptVG+Pv6Eqoi0CABAAgAQAIAa3GtioKSSonOGsG4cyeQCdCLk8IiutjVBykZxca6a4Vbqid287mt5NHgFpQgoLCOcuulbNykNU4hEcQ1pc4gNAySeACBUs9jO9T6nluUjqWheWUQO9zSQZvPwHRZ917n2jwdLoenRoSlYsy/Yrjm4bk8DwCrmodqcl4IZ99p2mfqEAdDE2oZ2kGNv8AEzxQA1IIOCMEceiBBEADmhwwUYAIpHxytIcWvadpjm7jkcx1SIGk+zNS0vdxeLcJJMCpiIZMB48ne3j6rUps3rvycnrtK9PbhcPgl1KUjtS1E1LUMnp3lkjOB/Q9EkoqSwx9c5VyUovDNGs1ziulG2aPAcNz2/lcs2yDhLB0mnvjdBSQ/TCcEACABACFAFB1VdDXV3YxH7CA4bj8TuZ/RX6K9scvlmBr7/Fs2rhEGpygCAKpr66OgpGW+F2H1HekxxEY5e0/AqrqZ4SijZ6Rp903bLy4+v8Aoo0Ee24lx7jRlxVE6EkLDaZ7/d4qOEbLHEF7gPuMHE+fIdSmWTUI5Y6MXJ4JnXemXWOrbV0UZbRvIbgH9i/du8j8c9FFTbvWHyPsr291wVnaIPbxd0jc8cv9FYIhwOyrGjPdkHh/negXkaTQPhPe3jkQgRo5IEEcMt6jh0SMUmtHXE0V5hDjsx1B7KUeGeB9fcSpqJ7ZlHqFHi0PHK7r+/6GoLTOTBAElYLm62V7ZCfsH92UdPH2KO2vfH3LWkv8GzPk+TR2uDgCDkEZB8VmnRp5PSBQQAIAitS1/wBQtcj2HEsn2cfQnn7BlS0w3ywVdZd4VTa54M5Wkc2CQAQBlurKo1WoKs5yIyIx5N3fHKzLpbrGdboK/D00ffv9xg7EdKxg+9JvOPDkoi6bP9HGmxZrS2apjArKjD5eng32A+pKz7p75eyLMI7Y4LJdLdDcKaSKaNr2vbsuY4bnjwKi7p5Q9PyfBjeqtFVdnlkqbe189GCSWDfJF0I/EOv+qu13qXaXJBOpruuCo54OB9oVghHcNaQMTDaH5sIHZPT6aKffC9oPhyQGBrLDJEcPafNAmDllzHgsOHHeD4EcCkDtwzZKKcVVFT1I3CaJr8eYz+q2IvMUzibYbLJR9GdkpGCUC+aOr/rVuMEhzLTnZOebTw+XsWffDbLPqb3T7t9W18xJ9QGgCABAFI1vVdrXxUoORCzJ83f0x6q9po4i5GJ1KzNih6FbVgzAQAo3lKKY3Vv7SrqJCd75Xuz5uKx3ydtBYgl7L9iy6CtH9tamjL25gpA2U54bQ+6PXJ/lUF89se3mT1rLya3WX+Kmcae30FbcZYzsuFJHljD4OecNz4gZKqxq9Xglcu+Rg/V1VSPBuem7nTQ85WDtQ0eJwOCf4KfEhNxZNiKpiY/7zXNDmu6FQNd+49NoqWofo/tl1e6djTDUHjJD3ST1HA/FSRunD3GuMZexnEmmqumqZaR1rrLpTMJH1ikpnsfGeeMjZI6bx4EK3vys8EOzHuRZsF47Z7GWe4DYBcC+AjcOu8Z6ZTvEj6jVGXoNZPrtNlk0c0eOLZoyPiE5NPgTuuRvKQ7vbLQRvBaEAarph21p63n9yB6LUo/LRyGuWNTP6kmpSoCAJnSdV9WvMTScNmHZnzPD3/FQ6iOYfQu6CzZcl69jQRwWedCKgAKAMxvM31i7VcvjKR7BuHuC06liCRzGplvulL3GSeQAgBW8QlFM4sukqy8ieo7eKkpGSvZ20rc5IO/A3euVg23Rg8eZ3lNMrIrH/dkXz6JbayOxVk7iSZ6h8e2N2Wt7u48uB9VX1EsyWCSCxEtj62QSS0lopGvbS4ZLI4OEcRxkMa1oLnvxv2Rw5kJYUuS3SIp3KL2xGlk1NS3OolpY6mB88WdtjWvje3HHLHchzwcjmBxTXUv4X+g/fJfMuxYAoSUDwQBG3i7w2yEyyuAGCcu2jgDicNBOBuydw5ZUsa9y3N9iJzecRRHU96pa+OKWVsLqWaQQsraaQuYyQ8GSNcA5hPLIIJ3Z3jKyoTW6LyEb5RltmsEV9I1O6DStbt4LcN2XH+NqZQn4iJbpJwZm1y0hPTaepr/TVYqInRsdVQbOHU5OPUDO/gratTlginTOC3SLvphuzp63j9wD671tU/lo4vXPOpn9STUhUBAHuGQwzRyt4seHDzBykaysDoy2yT9DVo3B7GuHBwyFlHVp5WT0gUR25pKBHwZMXmQl54uOfVa2MHJ53dxECAgBQRke9KBFQytl0la30/7F42jj82/9crlLsux5PVOlxSj9EWjQMAh022HjionJ/mkLh7iEs5ZeSpfT4dso++fuN9WUdysmmKWbST5GS0FVLPIP2hIk2t7s/eAzjoMeCsRsbSa8uSj4aUpRfnwZ99Fltuty1vFdJWyOYyV01XUOIIOc7WSOZzjHVPclJrA5x8ODTXJtm78PBUn3ZOuAPBIBnP0qV1/tNW6e1ybNBcaEUcuWAjcXZbk8Hd4nrk+CtwmopPywV3XvW3zyNvogstVLYr8KxrmUVXSmCPadudJvxjq3xHDKcppZl5CWxyowfP7Fl+kKnj/2TkpIWBrJZ4ow0DhmQE/qVXrl8eSxGvc1BebRXI3Mi0/e+1/u/wBUcHD+UqKLfiRwbGvjHwzrpr/d+354/VmA+eF1NX5aPLtasamf1JFPKoIAEoGoWh/a2qjk/NAw+4LKmsSaOpoluqi/ZDtNJTzJ+zd5FCElwzJIxhjR0C12cilhHpIKCAGl3qRR2qrqScdnE4jz4D4plktsGyfTV+JdGPqyj6U1HHbad9tuTXvt8h2g9gy6F3iBzHTj6lYdtO/uuTu9PqXTLJpmg7nSTNqKOmrIagftWOjdvI4HdxGN24+KqOEo8l3VXV3YsgywzVz4pi1jN43Z4JF7EcNPGUcsdQSmSFp3gHeQjLIZVxjLAr3hgy44A5pABj2yDLCHDxCBMCThvYu2mbbebSMg+xKm0CSbwM4q5znMi7IbIOAB+EIbzyWHp4xWUyJ1pW22Clp6e5V0VMXv7Ru28AnG7dnzRibXwrImmshXPfN8GYaq1NS1tELZZ8/U9ralmII7Ug7gM78ZAOTxwrFFDi98+SPWavxvhXBZtKzCSywN/wCXlnv+WFuaaWa0cV1SvbqW/XDJdTmaCABKKaZYBiyUA/6dn/yFl2fOzptL+RD6L9h+mE4h4IAyqpj7GpmixjYe5voVqxeYpnKTjtk16M5JRgIAqH0g3FrKeG2xnL5SJZB/hB3ep+Cp6ufbaja6PRmTufl2RRVTN866cvM2n7/BcqcZ7J/2jPzsP3m+0e/CjktywxfdH0jQVdLdKKCupHMlgnYHxvxy+aoSTi8MsxllZQ6SDjjPUQwA9s7YbzLh3fXgjAJNnimrKafAppBI0c2DLfXgjArTXI58kDTnNLFTwyTzObFFG0ue924NaN5JRz2QN+p85651AdSahnrW7QpmfZ0zXDGIxzx4k5PtV+EdqwVn3eSLg3RNHTKkQhe9DV4a80z3bpW5b/E0b/d8Fb0s8Sw/MyOr0b61YvLn6FyV85wEgB+qANUoY+xoqeLGNiNrfQLKk8tnV1LbCK9jukHiHggDO9UU5p73Ubu7LiRvtG/35WjRLNaOd10Nl8vciVKUwQKZHeax9wulTUvJw6QhgPJo3D3YWVZLfJs7LTVKqmMF6DJMJhjIMSO800ci5fR7reXTE31Ws25bXK7LmN3uhcfxN8R4j03qKyvevcWL2s3Wgraa4UsdVRTxzwSDLHxuyCqbTT7k6eeDv6pBQO85QByqqiCkgfUVU0cMEY2nySO2WtHUpUm3hCN4MV+kbXzr7t2y0Ocy2g/ayEYdPj4N+Kt11be75IZS3P2M/wCnipRMDs93sgPJOGkraJ3wSdpGcOjcHt9icnh5QjgrIuD8zVo3iSNsg/GA71WunlZOIlHbJo9IGjq1U5qrlTQNGduQbXRvE+7KbZLbFsmohvtjH3NQHBZZ1AqABAFX1zRl9NDWMGTEdh+Pynh7/irOmlhuJl9TqzBTXkUxXjFFSAY/c6V9FcammkBzHI4A+IzuPphZMo7ZNHa0WKyuM15pHAsdsB+DsF2ztcs8U0kys4GNQMSnqmscjkkFJSxahuun5jNaqx0IJy+MgFknm07vbx6pHGMuRFld0bpaNT1E1so6ivou/NAyRxiOBlzQdwPn4rPm0pNItKLwhy7UEsp2aSjdk7tp5z7v6puRdrMI1FqS836dwu9Y6RjHHELO7GwjwaOfU5K0YxSXYqPL5IVOFOkLdqQBKIzvK1zntLASGDadjkMgfqlEykS1phfK7ZjBL5HBjfNOSz2QjkoLc/I1aNgijZG37rGho9m5ayWFg4iUt0mz0lGlm0PR9pVzVbgdmIbDf4jx93xVbUywtpqdNqzN2ehdBuCpG0KgAQBxrIGVVNJBKMskaWlKm08oZZBWRcJcMzCsppKOqlpph34zg9eq1Iy3LKOYsrdcnGXKOKUjKtrSxOrY/wC0KRu1URNxIwcXs6dR8FV1FLkt8eTX6ZrVW/Cm+z/Rlds9AbrYa+ngGaqnlbPG0De4bOCPbj1CrVw3waXKNTU3fh9RCUvlawVuqaHs2m8lAy+NUg4601PLV1EdNTtL5pniNjBxJO5AjZ9JwWqSmpYYI8OEUbWDG7gMLNksybLkJrCR0ZQzbQ3gdcpuB29Hzxqi3yWrUVxo5m7LmVDy3djLSctPoQtOLzFMort2ItKKOaZoYwvccZ5pUNJ5tudSaaNTONme4zsELDxEbe9n24+CmcNteX5lBXeNqtkeI5+7LTpGymnaysqG4IH2LSPHi75Kxp6cfGyj1TWr8it/X/BaFdMI9RsdI9scYJe47LQOJKRvCyxUm3hGl2ahbbqCKnG9wGXnxceKzLJ7pNnTaepVVqA+TCcEACABAFb1daTVQ/XIGntoR3wPxt/orGns2va+DO1+m8SPiR5RSFfMMEghHxWmnp7q64Un2L5Gls0bfuSDjnHJ2efn5qNVJT3ItPVTnV4U+6Xdeq/0V7Vel+2L6+3Bge7fLAcNDvEt69FW1NUV8aZq9K1dljVDTb8sd/uV2h0jNL36ybsWHeGM7zsfAe9Zcr4r5e519PTLJ97Hj6c/4Ltoj+y9OXLs6mkgDZziKte0F8Z8C7kDu4Y9OEMpuaJ7+nxjHdWu6NTGOI5qIzhUAZt9IE9vvtSy3xU0EzoHfa1ewNpn+BrvipYycODQ02hU1vtRQ67SBB2qCfbbn9nLuPsPzUsb0/mGXdLku9bz+4/03pN9TKJ7oxrKdh7tPkEyEePg34rR01Ss+LPY5bqmqs0r8La1J/8Adi4VFpgq7hFV1Q7UQN2YYiO63PEkcycD0V11qUsvyMKvVTqqcIcvl+f+h+pSoCQC2aPtByLjUt6QtI/9vkqmotz8KNfp+m/9Zf0/yW/CqGuCABAAgAQAIApep7A6B762iZmJxzIwfgPiOiuUXZ+GRi63R7W7IceZWFaMsY3e4i3wAtG1K/OwDw8z0VfU6hUx9zZ6P0mXULXntCPL/t/Uje3fUhsj3E5GVz9lk7HmbyelaXSUaWGymOEIoyyeZI2SsLJBlp4hKJgkLHqOtsbRTVDHVdvbubv78Q6Hw6FO7Mo6jRRs+KPZne86trLrGaa1xPpKd26SaTdI4eAxw/zwR2QyjQqL3Wd2Q8MLIGBkYwB6lNzk0cHRIKAeY+81xaRvyE6EpQeYvBDfRVfBwtipL3Hllun15ro5cCZu/o4ePmt7Sarxltlyed9d6L+Bkrau8H+j9CUV050ntOWF1weKipbilB4cDIfkq9121YXJoaPRu175fL+5fGtDWhrQA0DAA5KgbqWBUCggAQAIAEACAEIyN6AKrf8ATG2XVNsaA473QcAf4fkrVWox2kZOq0Gfjq+xj+oHufd6hjw5rosR7LhgtHl55Wbq7N9zZ3HQNOqOnw7d33f/AH0PdrkDo3Rfl3jyVORtpjxNFBAAgBUAIgAQA3uEmxTOA4v7oSoRsY2qR0VypXMBLjIG4AySDuwrVEtlsWZ3VaFforYP0/VcGv2LS7pHNnubS1nFsHM/xeHkte3ULiB51pdA38Vv2/yXFrGsaGtADQMADgAqZsJYPSBQQAIAEACABAAgAQAIAhNQaXtWoGj6/TfbDc2eM7MjfaOI6FMlCMuSzp9Xdp38D/p5GfV/0b3W2VPbWyVldT8NgnYkx8D7CPJV50Sx2NzT9Yqn2sW1/dELU0tRSP7Oqglhd+WVhafeqrTjya1dsLFmDTOKQeCAFQAiAPcMUs7+zp45JX8mxtLj6BKk3wNlOMFmTwTNL9H95u00ZqdigpmjOZN7z5NH6kKxXRLHczL+rUV9o/E/0+5f9N6PtWn8SUsJlqsYNTMdp/s5N9iswrjEwtTrrtR2k8L0LCpCmCABAAgAQAIAEACABAAgAQAIAQoA5TwQzx7E0TJG8Nl7QQhpCqcod4vBE1Gk7FUkl1uiYTziJZ7huUTpg/IuQ6hqocTf7jKTQVkIyBUt8pfmm/hqyddX1XqvsIzQVkxvFSfOX+iT8NWD6vqvVfYdw6QsVO5pFA2Q/vXOePQnCkjRWvIhl1LVS/jx9MEvBTQUjNilhjhZ+WNgaPcnpJcIpSslN/E8nccUo1CoFBAAgAQAIAEACAP/2Q=="
              alt="avatar" />
            <div style="display: flex;flex-direction: column;flex: 1">
              <div class="comment__content">
                abc
              </div>
              <div class="comment__reply">
                Reply
              </div>
            </div>
          </div>
        </div>
        <div class="comment__footer">
          <input />
          <button>Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.comment {
  border: 2px solid #000;
  border-radius: 8px;
  padding: 35px;
  position: relative;
  min-height: 800px;

  &__list{
    display: flex;
    flex-direction: column;
  }

  &__item{

    display: flex;
    flex: 1;
    gap: 20px;

    img{
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
    }

  }

  &__content{
    flex: 1;
    padding: 10px;
    background-color: #ccc;
    border-radius: 8px;
    width: max-content;
  }

  &__footer{
    position: absolute;
    width: 80%;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;

    button{
      max-width: 50px;
      background-color: #5B72EE;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      outline: none;
      border: none;
    }
    input{
      flex: 1;
      padding: 10px 0;

    }
  }

  &__reply{
    font-size: 16px;
    color: #ddd;
  }
}
</style>