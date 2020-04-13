# Introduction 
API server for bitcoin Hierarchical Deterministic wallet. It support below features:
1. Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
2.  Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and addresses can be specified


# Installation
1.	download soucr code
2.	run "npm install"
3.	run "npm start"
4.	The local https server will be started

# Call API Server with curl
- Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path

    curl https://localhost/api/gensegwitaddress -k -H "Content-Type:application/json" -X POST --data '{"seed": "f4f0cda65a9068e308fad4c96e8fe22213dd535fe7a7e91ca70c162a38a49aaacfe0dde5fafbbdf63cf783c2619db7174bc25cbfff574fb7037b1b9cec3d09b6","path":"m/84/0/0/0/6"}'


- Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and addresses can be specified

    curl https://localhost/api/genmultisigaddress -k -H "Content-Type:application/json" -X POST --data '{"pubkeys":["022bfa20bf739d5072320c128ca6734c2e177dff913b9a4d39812acddbeb5802c5","0391eec60a617e2beccc684b617d36a26f08e2b2b64f1e72e1d8a8ec632a8112b6","035403ded32575dd0170b1203ef8f91be3b735fdeeaaf1302840e2f63dad7191b9","043acc2157d2ed9659dcddce97280fa70bae74e1c757f4457b7296aba4f81141a37cb5628d9cff2f1be06eb528de4eaa3ee51d93a979fe854b715dc40bfd61b236"],"m":2}'

Note: I have setup a live demo server, you can try with it: https://39.98.193.129/api/genmultisigaddress

# Documentation

- Generate HD SegWit bitcoin address
    HTTP Request
    POST /api/gensegwitaddress
    Parameters:
    + seed:string, hex string to generate master key of HD wallet
    + path:string, the path of child node in HD wallet, the formate follw the stand of bip32


- Generate Multisignature bitcoin address
    HTTP Request
    POST /api/genmultisigaddress
    Parameters:
    + pubkeys:string[], the public keys of all the participants
    + m:number, the amount of signatures required to release the coins

# References
- https://github.com/bitcoinjs/bitcoinjs-lib/
- http://bip32.org/
- https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
- http://bitcoinmagazine.com/8396/deterministic-wallets-advantages-flaw/

# License
MIT
