import "jest";
import validateToken from "~/helpers/validateToken";
import "isomorphic-fetch"

const xit = process.env.GITHUB_TOKEN ? it : it.skip;

describe("ValidateToken: token validation", () => {
    expect.assertions(1);

    it("invalid token should return false", () => {
        return expect(validateToken("asdfasdfqqweqwer")).resolves.toEqual(false);
    });

    xit("valid token should return true", () => {
		return expect(validateToken(process.env.GITHUB_TOKEN as string)).resolves.toEqual(true);});
});