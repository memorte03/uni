import { basePath } from "~/api";

const validateToken = async (token:string) => {
	if (!token.match(/ghp_[A-Za-z0-9_]{20,255}/g)) return false;

	return await fetch(basePath + 'user', {
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: 'token ' + token,
		},
	}).then((res) => res.json()).then((json) => json.login ? true : false);
};

export default validateToken;