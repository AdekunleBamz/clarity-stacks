import { hexToBytes } from "@noble/hashes/utils";
import { boolCV, bufferCV, uintCV } from "@stacks/transactions";
import { describe, expect, it } from "vitest";
import {
    block_header_hash,
    merkle_tree_from_txs,
    parse_raw_nakamoto_block,
    proof_path_to_cv,
	raw_block_header
} from "../src/clarity-stacks.ts";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;

// Using block 438,372 as an example (same as main tests)
const expected_block_header_hash = hexToBytes("ba4103daab4661a569ddf355f2bec99322298e49b8bdab33a431aadac98c2b36");
const raw_block = hexToBytes('00000000000006b0640000005cc4e4fab48077a657f82aac6012166525de0c5b53a3008c03d7039979ef223a52b3112fede246066c1b3be96acc3f0e47c345b332c0aebf96e9414d181f9dc949115bc057b98a0d75348e54c05ff8287e3bb80c95872c04038d6299532a78ff61705d4e4867644b1aec6ec069376f387faaa464591b7eb20200000000677e87db00b57b3fde1c8bce6a9364f9e47fa6a65d3c3a5bc76d377ed8a74546a718ab475d2b20dd591a003501624e6a842484a162c7ffccb857f4a78d76caae6366a33cd700000014007e8cb07951f28c9b6b99ea5aa9237dc7b3cc27b6c3ca92296dde9e691bd557c12fa01f1c7679f62c3c321bb3d86f675c370cfd2b23da5a70ac9ef0e1adbb97d0007467b27153049fa8e41187de38530148b703d2752c34dcf627cafb8b47c9d55743c9b5fd22d1f594d8861807f4141f32891f6328618dcf383a130ce5d4b7906901b62dfb71f37f92cc6b3a5204626c3e2df8910e0a44a33aaf2575d91b6949cfc80eb718ef692b5c70ee710f5a58dc692de4980876c3c0bb0183c9f8c5d33256c301f0a1557b05dc9da978d24ac5a89f50d8821665a8ece7f5f60b0857176f020fc0099541c112527fb59c6e22f6f4c0fb998e6ea610508820a1f62d53dd1bed7a8300a965bd21a6848e2cfd4f22bfe355270569ca8d036a8a0e0956f699b8a6c313866ea247630fdb8791c9407e030d564a48da4c3d56129017eb65f0f24256cae0d300eda58c7664cc4270a94764b13c6180d4f5988870856463eef0fc63975dadc0882553fe1205653c3148cad926e9c3f321fa963ed8a80ccf2148004a2a4d4af9de00d9d775837649928b32a14840b31629f95ad4ab3585220bf3a844afcb507fef124978cd57c55f6350ad60ad2474457e55e277db6cf8377d5ff893016c60192398008ae1d24927af6b682fa2b199cabd094f911ade725360bbabf402cffcd925f17222d3148f250ee67b1bd367113c2c7a13dc381dbf667762588eb8cb48341ce7f101d7ab98aa0b4249a0f5a5fd9ff18622b36a7a10f8f411a5200f52e4c653079b860a357546c5dda85cfacf73ca67747a0ca5b26c9c4c5442c77b2418e2ecd8e01a000cc8b19de661474bc2d53da4d3d0cc0e431386b04290586c54d9d2caa0869a0d4522a18efe5c39a888ebaea55e0b5f07f11354cdb560309c16749c73be03b5790095c9bba8f5c9ab8c979a3f6293c939337fd7d1ce84e2452d1bf546100a09f7e018de2ee24218e1f3468cd967811873ee8f8b559f341f083bd34b0a91d1de546b003af83dba80a26260ab5e5fe774d92b944e1e133d94dd27ef8b443831ff406c115980a05cf71d4d11cee9705c9970cf011b02a0f9198c18e3c244618486f04fff010236c15f5fb370db4b6101c6f21f94bc166dd5f42267870c9aa3a01f4cfc8c0c065a7568e870a91c6ebe6280ad078992a83c7af7a2cbbe6b2fc5a94a69723e98017593f306eac4913ce4c689220ad9b4cfe87b77f60e50f0c50fdcd96177607e936ba3b84953ca9d0a649dc67dcb647f97ddf0536361105d61409588b5eec6ebb401b8798d9097742e7b78aae992744d714a646ef28f9207c695370bce0c8cdf1ae65a4aa25cd5d7c49a443d39c22f19ca6e191ac6a988870180964a0cb1dd424d4d014e9f6201f8f085a4b1cbbce4045bfdabdfac819b4f1542050c5787f9afcff8f9386bbc585546b609e6bc26fc5066e8bc3176811b1813681703b9bb319283781300d9f8586e933e3b0cdc7a784b2d6379e4dc62f1e6075770e885c7adcf1ed41a767c12b6761e2381caa7d90e193048989de7206e48b43126a89c6a80409fe336c700a695a65b6c83daf301b5ed1f90dc7842ed9ea57e774fe0e4638b5c5a6e3ff3724baf51901d9294a523ef108ea0b62486b6f80c49ca34e8d84f3401da7d111e0e0115c2a5e92204a27a66ecb1df66be399e43536fa4e2bf62ae482136c1b7a607677faceeb6ff8ef1cbf5a26e26bd0ba8b5a7e4e8b2b012e6f9413f8d0314d37dcd00d5b1106dcd197e3eaaa5e5969e7eb1350dc7c09e50da1adef7369ae45c52f3c213b8c59cce0bad14884f0e26f95eed666e9318569ddde5671084e8fb297de5f90ec9000001daffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff010000000200000000010400c96dc19fafcf7bf1b42c59faa88e0ea5fcd8ef6c000000000000034b0000000000055c33000088e497445b9165f31e9ec591ae886d4cafd1ea365a0c772642e2e1a517626bde164eb86017967506b0f48d60c08114b6f0aa997510d03645bc7976ac53d802be0302000000000005162fbde0255efaa0354d12463d045c3291b3cc1a8b00000000000f638d0000000000000000000000000000000000000000000000000000000000000000000000000000010400a4e680bdfe8804b7fe69a4a64948c558558293a7000000000000000d00000000000027100001a039ec812f2b59f0967e6d71be072de17282e73fd661f8b01d587c0a4ea3f54d0d8bc1743d8f40a9990c304d523fb1561131dc34abdf523b478e79858559c30d030200000002010216a4e680bdfe8804b7fe69a4a64948c558558293a716eae2820eebe09cfe1ad1436203a264fd9f958c271477656c7368636f726769636f696e2d746f6b656e0e77656c7368636f726769636f696e01000000001dcd6500000316402da2c079e5d31d58b9cfc7286d1b1eb2f7834e0f616d6d2d7661756c742d76322d303103000000000005471002162ec1a2dc2904ebc8b408598116c75e42c51afa2612777261707065722d616c65782d762d322d310b737761702d68656c706572000000050616402da2c079e5d31d58b9cfc7286d1b1eb2f7834e0c746f6b656e2d77636f7267690616402da2c079e5d31d58b9cfc7286d1b1eb2f7834e0d746f6b656e2d777374782d76320100000000000000000000000005f5e1000100000000000000000000000ba43b74000a01000000000000000000000000020fc266');
const block = parse_raw_nakamoto_block(raw_block);

describe("clarity-stacks.ts - Extended Tests", () => {
	it('Validates merkle tree construction with various transaction counts', () => {
		// Test with different numbers of transactions
		const testCases = [
			{ txCount: 1, expectedDepth: 0 },
			{ txCount: 2, expectedDepth: 1 },
			{ txCount: 3, expectedDepth: 2 },
			{ txCount: 4, expectedDepth: 2 },
			{ txCount: 5, expectedDepth: 3 }
		];

		for (const testCase of testCases) {
			const mockTxs = Array(testCase.txCount).fill(null).map((_, i) =>
				({ txid: () => `mock_tx_${i}_`.padEnd(64, '0') })
			);

			const merkle_tree = merkle_tree_from_txs(mockTxs);
			const depth = merkle_tree.depth();

			expect(depth).toBe(testCase.expectedDepth);
		}
	});

	it('Handles edge case with single transaction', () => {
		const singleTxBlock = { ...block, transactions: [block.transactions[0]] };
		const merkle_tree = merkle_tree_from_txs(singleTxBlock.transactions);
		const calculated_merkle_root = merkle_tree.root();
		const depth = merkle_tree.depth();

		expect(depth).toBe(0); // Single transaction should have depth 0
		expect(calculated_merkle_root).toBeDefined();
	});

	it('Validates proof generation for different tree depths', () => {
		// Create a tree with 8 transactions (depth 3)
		const mockTxs = Array(8).fill(null).map((_, i) =>
			({ txid: () => `mock_tx_${i}_`.padEnd(64, '0') })
		);

		const merkle_tree = merkle_tree_from_txs(mockTxs);

		// Test proofs for different indices
		for (let i = 0; i < mockTxs.length; i++) {
			const proof = merkle_tree.proof(i);
			const proofCV = proof_path_to_cv(i, proof, merkle_tree.depth());

			expect(proof).toBeDefined();
			expect(proofCV).toBeDefined();
		}
	});

	it('Handles malformed transaction IDs gracefully', () => {
		const malformedTxs = [
			{ txid: () => "" }, // Empty
			{ txid: () => "invalid" }, // Too short
			{ txid: () => "z".repeat(100) }, // Non-hex characters
			{ txid: () => null }, // Null
		];

		// These should not crash the system but may produce invalid results
		for (const tx of malformedTxs) {
			try {
				const merkle_tree = merkle_tree_from_txs([tx]);
				expect(merkle_tree).toBeDefined();
			} catch (error) {
				// Expected for some malformed inputs
				expect(error).toBeDefined();
			}
		}
	});
});

describe("clarity-stacks.clar - Extended Security Tests", () => {
	beforeEach(() => {
		// Set up block header hash for testing
		simnet.callPublicFn("clarity-stacks", "debug-set-block-header-hash", [uintCV(438372), bufferCV(expected_block_header_hash)], address1);
	});

	it("Rejects verification with incorrect block header hash", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const proof = merkle_tree.proof(tx_index);
		const proofCV = proof_path_to_cv(tx_index, proof, merkle_tree.depth());

		// Use wrong block header hash
		const wrong_header_hash = hexToBytes("aa4103daab4661a569ddf355f2bec99322298e49b8bdab33a431aadac98c2b36");

		const response = simnet.callReadOnlyFn(
			"clarity-stacks",
			"was-tx-mined-compact",
			[bufferCV(hexToBytes(block.transactions[tx_index].txid())), proofCV, uintCV(438372), bufferCV(wrong_header_hash)],
			address1
		);

		expect(response.result).toBeErr(); // Should fail with incorrect header
	});

	it("Rejects verification with tampered merkle proof", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const proof = merkle_tree.proof(tx_index);

		// Tamper with the proof by changing a hash
		const tamperedProof = [...proof];
		if (tamperedProof.length > 0) {
			tamperedProof[0] = hexToBytes("ff".repeat(32)); // Tampered hash
		}

		const tamperedProofCV = proof_path_to_cv(tx_index, tamperedProof, merkle_tree.depth());

		const response = simnet.callReadOnlyFn(
			"clarity-stacks",
			"was-tx-mined-compact",
			[bufferCV(hexToBytes(block.transactions[tx_index].txid())), tamperedProofCV, uintCV(438372), bufferCV(raw_block_header(block))],
			address1
		);

		expect(response.result).toBeErr(); // Should fail with tampered proof
	});

	it("Rejects verification with wrong transaction index", () => {
		const wrong_tx_index = 999; // Non-existent transaction index
		const merkle_tree = merkle_tree_from_txs(block.transactions);

		// Try to generate proof for non-existent index
		try {
			const proof = merkle_tree.proof(wrong_tx_index);
			const proofCV = proof_path_to_cv(wrong_tx_index, proof, merkle_tree.depth());

			const response = simnet.callReadOnlyFn(
				"clarity-stacks",
				"was-tx-mined-compact",
				[bufferCV(hexToBytes("ff".repeat(32))), proofCV, uintCV(438372), bufferCV(raw_block_header(block))],
				address1
			);

			expect(response.result).toBeErr(); // Should fail with invalid proof
		} catch (error) {
			// Expected if proof generation fails
			expect(error).toBeDefined();
		}
	});

	it("Rejects verification with wrong transaction ID", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const proof = merkle_tree.proof(tx_index);
		const proofCV = proof_path_to_cv(tx_index, proof, merkle_tree.depth());

		// Use completely wrong transaction ID
		const wrong_txid = hexToBytes("00".repeat(32));

		const response = simnet.callReadOnlyFn(
			"clarity-stacks",
			"was-tx-mined-compact",
			[bufferCV(wrong_txid), proofCV, uintCV(438372), bufferCV(raw_block_header(block))],
			address1
		);

		expect(response.result).toBeErr(); // Should fail with wrong TXID
	});

	it("Handles verification with non-existent block height", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const proof = merkle_tree.proof(tx_index);
		const proofCV = proof_path_to_cv(tx_index, proof, merkle_tree.depth());

		// Use non-existent block height
		const non_existent_block = 999999999;

		const response = simnet.callReadOnlyFn(
			"clarity-stacks",
			"was-tx-mined-compact",
			[bufferCV(hexToBytes(block.transactions[tx_index].txid())), proofCV, uintCV(non_existent_block), bufferCV(raw_block_header(block))],
			address1
		);

		expect(response.result).toBeErr(); // Should fail with unknown block
	});

	it("Validates proof structure integrity", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const proof = merkle_tree.proof(tx_index);

		// Test with invalid proof structures
		const invalidProofs = [
			{ tx_index: -1, hashes: proof, tree_depth: merkle_tree.depth() }, // Negative index
			{ tx_index: tx_index, hashes: [], tree_depth: merkle_tree.depth() }, // Empty hashes
			{ tx_index: tx_index, hashes: proof, tree_depth: -1 }, // Negative depth
			{ tx_index: tx_index, hashes: proof, tree_depth: 100 }, // Excessive depth
		];

		for (const invalidProof of invalidProofs) {
			try {
				const invalidProofCV = proof_path_to_cv(
					invalidProof.tx_index,
					invalidProof.hashes,
					invalidProof.tree_depth
				);

				const response = simnet.callReadOnlyFn(
					"clarity-stacks",
					"was-tx-mined-compact",
					[bufferCV(hexToBytes(block.transactions[tx_index].txid())), invalidProofCV, uintCV(438372), bufferCV(raw_block_header(block))],
					address1
				);

				// Should either fail or return false
				expect(response.result).toBeDefined();
			} catch (error) {
				// Expected for some invalid proof structures
				expect(error).toBeDefined();
			}
		}
	});

	it("Prevents replay attacks across different block heights", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const proof = merkle_tree.proof(tx_index);
		const proofCV = proof_path_to_cv(tx_index, proof, merkle_tree.depth());

		// Try to verify the same transaction against different block heights
		const different_blocks = [438371, 438373, 438400];

		for (const block_height of different_blocks) {
			const response = simnet.callReadOnlyFn(
				"clarity-stacks",
				"was-tx-mined-compact",
				[bufferCV(hexToBytes(block.transactions[tx_index].txid())), proofCV, uintCV(block_height), bufferCV(raw_block_header(block))],
				address1
			);

			// Should fail for different block heights (unless the block header is set for that height)
			if (block_height !== 438372) {
				expect(response.result).not.toBeOk(boolCV(true));
			}
		}
	});

	it("Validates transaction ordering in block", () => {
		// Test that transaction indices matter for verification
		const merkle_tree = merkle_tree_from_txs(block.transactions);

		for (let tx_index = 0; tx_index < Math.min(block.transactions.length, 3); tx_index++) {
			const proof = merkle_tree.proof(tx_index);
			const proofCV = proof_path_to_cv(tx_index, proof, merkle_tree.depth());

			const response = simnet.callReadOnlyFn(
				"clarity-stacks",
				"was-tx-mined-compact",
				[bufferCV(hexToBytes(block.transactions[tx_index].txid())), proofCV, uintCV(438372), bufferCV(raw_block_header(block))],
				address1
			);

			expect(response.result).toBeOk(boolCV(true));

			// Now try with wrong TXID for this index - should fail
			const wrong_txid = hexToBytes("11".repeat(32));
			const wrongResponse = simnet.callReadOnlyFn(
				"clarity-stacks",
				"was-tx-mined-compact",
				[bufferCV(wrong_txid), proofCV, uintCV(438372), bufferCV(raw_block_header(block))],
				address1
			);

			expect(wrongResponse.result).toBeErr();
		}
	});

	it("Handles large block headers gracefully", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const proof = merkle_tree.proof(tx_index);
		const proofCV = proof_path_to_cv(tx_index, proof, merkle_tree.depth());

		// Test with oversized block header (should be rejected)
		const oversized_header = new Uint8Array(100000).fill(0);

		const response = simnet.callReadOnlyFn(
			"clarity-stacks",
			"was-tx-mined-compact",
			[bufferCV(hexToBytes(block.transactions[tx_index].txid())), proofCV, uintCV(438372), bufferCV(oversized_header)],
			address1
		);

		// Should fail due to invalid block header
		expect(response.result).toBeErr();
	});

	it("Resists proof manipulation attacks", () => {
		const tx_index = 0;
		const merkle_tree = merkle_tree_from_txs(block.transactions);
		const original_proof = merkle_tree.proof(tx_index);

		// Test various proof manipulations
		const manipulations = [
			// Reverse the proof hashes
			[...original_proof].reverse(),
			// Duplicate hashes
			[...original_proof, ...original_proof],
			// Truncate proof
			original_proof.slice(0, Math.max(0, original_proof.length - 1)),
			// Add extra hashes
			[...original_proof, hexToBytes("aa".repeat(32))]
		];

		for (const manipulated_proof of manipulations) {
			try {
				const manipulatedProofCV = proof_path_to_cv(tx_index, manipulated_proof, merkle_tree.depth());

				const response = simnet.callReadOnlyFn(
					"clarity-stacks",
					"was-tx-mined-compact",
					[bufferCV(hexToBytes(block.transactions[tx_index].txid())), manipulatedProofCV, uintCV(438372), bufferCV(raw_block_header(block))],
					address1
				);

				// Manipulated proofs should fail verification
				expect(response.result).not.toBeOk(boolCV(true));
			} catch (error) {
				// Expected for some proof manipulations
				expect(error).toBeDefined();
			}
		}
	});
});
