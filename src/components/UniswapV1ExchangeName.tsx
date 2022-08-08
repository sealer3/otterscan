import React from "react";
import { NavLink } from "react-router-dom";
import TokenLogo from "./TokenLogo";
import { ResolvedAddressRenderer } from "../api/address-resolver/address-resolver";
import { ChecksummedAddress } from "../types";
import {
  UniswapV1PairMeta,
  UniswapV1TokenMeta,
} from "../api/address-resolver/UniswapV1Resolver";

type UniswapV1ExchangeNameProps = {
  chainId: number;
  address: string;
  token: UniswapV1TokenMeta;
  linkable: boolean;
  dontOverrideColors?: boolean;
};

const UniswapV1ExchangeName: React.FC<UniswapV1ExchangeNameProps> = ({
  chainId,
  address,
  token,
  linkable,
  dontOverrideColors,
}) => {
  if (linkable) {
    return (
      <NavLink
        className={`flex items-baseline space-x-1 font-sans ${
          dontOverrideColors ? "" : "text-link-blue hover:text-link-blue-hover"
        } truncate`}
        to={`/address/${address}`}
        title={`Uniswap V1 LP (${token.symbol}): ${address}`}
      >
        <span>Uniswap V1 LP:</span>
        <Content
          chainId={chainId}
          address={token.address}
          name={token.name}
          symbol={token.symbol}
          linkable
        />
      </NavLink>
    );
  }

  return (
    <div
      className="flex items-baseline space-x-1 font-sans text-gray-700 truncate"
      title={`Uniswap V1 LP (${token.symbol}): ${address}`}
    >
      <span>Uniswap V1 LP:</span>
      <Content
        chainId={chainId}
        address={token.address}
        name={token.name}
        symbol={token.symbol}
      />
    </div>
  );
};

type ContentProps = {
  chainId: number;
  address: ChecksummedAddress;
  name: string;
  symbol: string;
  linkable?: boolean;
};

const Content: React.FC<ContentProps> = ({
  chainId,
  address,
  name,
  symbol,
  linkable,
}) => (
  <>
    <div
      className={`self-center w-5 h-5 ${linkable ? "" : "grayscale"}`}
    >
      <TokenLogo chainId={chainId} address={address} name={name} />
    </div>
    <span>{symbol}</span>
  </>
);

export const uniswapV1PairRenderer: ResolvedAddressRenderer<
  UniswapV1PairMeta
> = (chainId, address, tokenMeta, linkable, dontOverrideColors) => (
  <UniswapV1ExchangeName
    chainId={chainId}
    address={address}
    token={tokenMeta.token}
    linkable={linkable}
    dontOverrideColors={dontOverrideColors}
  />
);

export default UniswapV1ExchangeName;
