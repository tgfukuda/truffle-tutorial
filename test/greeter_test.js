const GreeterContract = artifacts.require("Greeter");  //import compiled contracts

contract("Greeter", () => {
    it("has been deployed successfully", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter, "contract was not deployed");
    });

    describe("greet()", () => {
        it("returns 'Hello World'", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hello World";
            const actual = await greeter.greet();
            assert.equal(expected, actual, "greeted with Hello World");
        });
    });
});

//split contract for testing order not to affect the result
contract("Greeter update", (accounts) => {
    describe("setGreeting(string)", () => {
        it("set Greeting to passed string", async () => {
            const greeter = await GreeterContract.deployed();

            const expected = "Hi, there";
            
            await greeter.setGreeting(expected);
            const actual = await greeter.greet();
            assert.equal(expected, actual, "greeting was not updated");
        });
    });

    describe("owner()", () => {
        it("returns default", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();

            assert(owner, "the current user");
        });

        it("matches current owner and deployer", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const expected = accounts[0];   //accounts -> provided by truffle

            assert.equal(owner, expected, "matches address used to deployer");
        });

        it("cant update greeting by wrong caller", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = await greeter.greet();

            try {
                await greeter.setGreeting("Not the Owner", { from: accounts[1] });    //call by another account
            } catch (err) {
                const errMsg = "Ownable: caller is not the owner";
                assert.equal(err.reason, errMsg, "should not update");
                return;
            }

            assert(false, "should not update");
        });
    });
});