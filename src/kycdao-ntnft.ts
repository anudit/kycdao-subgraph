import { BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import {
  KycdaoNTNFT,
  Transfer,
  UpdateExpiryCall,
} from "../generated/KycdaoNTNFT/KycdaoNTNFT"
import {
  KycValidity
} from "../generated/schema"

export function bigIntToBytes(num: BigInt): Bytes {
  const idHexString = num.toHexString();
  const paddedIdHexString = idHexString.substr(0, 2) + idHexString.substr(2).padStart(64, '0')
  const shinyId = ByteArray.fromHexString(paddedIdHexString) as Bytes;
  return shinyId;
}

export function handleTransfer(event: Transfer): void {

  let entity = new KycValidity(
    bigIntToBytes(event.params.tokenId)
  )
  entity.user = event.params.to;
  entity.validity = true;
  entity.txnHash = event.transaction.hash;
  entity.verifiedOn = event.block.timestamp;
  entity.tokenId = event.params.tokenId;

  let contract = KycdaoNTNFT.bind(event.address)
  let exp = contract.tokenExpiry(event.params.tokenId);
  entity.expiry = exp;

  entity.save()
}

export function handleUpdateExpiry(event: UpdateExpiryCall): void {
  let entity = new KycValidity(
    bigIntToBytes(event.inputs._tokenId)
  )
  entity.expiry = event.inputs._expiry;

  entity.save()
}
