const root = require("app-root-path");
const expect = require("chai").expect;

const createGitRepoFixture = require(root + "/test/dummy-data/create-git-test-repo");
const gitCommit = require(root + "/src/routines/git-commit");

describe("git-commit", function() {

  it("should create a commit with the given message", function() {
    let removeGitRepoFixture = () => {};
    return createGitRepoFixture().then(function(repoFixture) {
      removeGitRepoFixture = repoFixture.remove;
      return gitCommit("Release version 0.0.1", repoFixture.repository).then(function(objectId) {
        expect(objectId).to.be.a("string");
        return repoFixture.repository.getHeadCommit();
      }).then(function(headCommit) {
        expect(headCommit).not.to.equal(null);
        expect(headCommit.message()).to.equal("Release version 0.0.1");
      });
    }).finally(function() {
      removeGitRepoFixture();
    });
  });

});
