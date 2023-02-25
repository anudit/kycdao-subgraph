# kycdao

Build completed: QmV9ssTN5vc7frZR7YxPNoRaVatchvTVoF9GBwWv521ExG

Deployed to https://thegraph.com/explorer/subgraph/anudit/kycdao

Subgraph endpoints:
Queries (HTTP):     https://api.thegraph.com/subgraphs/name/anudit/kycdao

```graphql
{
  kycValidities(where: {user: "0x05eb7f0ebcfc8bee7d5283521a08ebef149569ed"}) {
    user
    validity
    verifiedOn
    tokenId
    txnHash
    expiry
  }
}
```