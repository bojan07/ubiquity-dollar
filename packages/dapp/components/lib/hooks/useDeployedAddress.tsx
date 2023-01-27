import { deployedChainId, deployedContractName } from "@/components/utils/deployments";
import contractDeployments from "@ubiquity/contracts/deployments.json";
import { useNetwork } from "wagmi";

// const LOCAL_CHAIN = "31337" as deployedChainId;

const useDeployedAddress = (...contractNames: deployedContractName[]) => {
  const network = useNetwork();

  // stop execution if network is not ready
  if (!network.chains) {
    console.warn("Network not found");
    return [];
  }

  const chain = network.chain;

  const chainId = chain?.id as unknown as deployedChainId;
  if (!chainId) {
    return [];
  }
  const deployment = contractDeployments[chainId];
  console.trace({ deployment });
  const deployedContracts = deployment?.contracts;

  console.trace({ contractNames });
  const addresses = contractNames.map((name: deployedContractName) => deployedContracts[name]?.address);
  console.trace({ addresses });
  return addresses;
};

export default useDeployedAddress;
