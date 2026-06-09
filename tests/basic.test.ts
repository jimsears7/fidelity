import { test, expect } from "@playwright/test";

function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

test("dupes", async () => {
  // console.log(findDuplicateCharacters("hello world"));
  console.log(dupe("hello world"));
});

function dupe(str: string): string {
  var seen = "";
  var duplicate = "";

  for (var i = 0; i < str.length; i++) {
    var currentChar = str.charAt(i);

    if (seen.indexOf(currentChar) < 0) {
      seen = seen + currentChar;
    } else if (duplicate.indexOf(currentChar) < 0) {
      duplicate = duplicate + currentChar;
    }
  }

  return duplicate;
}

function findDuplicateCharacters(str: string): string[] {
  const counts = new Map<string, number>();
  console.log("counts:", counts);

  const duplicates = new Set<string>();
  console.log("duplicates:", duplicates);

  for (const char of str) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
    console.log(`char: ${char}, count: ${counts.get(char)}`);

    if (counts.get(char)! > 1) {
      duplicates.add(char);
      console.log(`Added '${char}' to duplicates`);
    }
  }

  return [...duplicates];
}

function isPalindromeMethod(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === reverseString(cleaned);
}

test("palindrome", async () => {
  console.log(isPalindromeMethod("A man, a plan, a canal, Panama"));
  console.log(isPalindrome("helloolleh"));
});

function isPalindrome(str: string): boolean {
  var left: number = 0;
  var right: number = str.length - 1;

  while (left < right) {
    if (str.charAt(left) !== str.charAt(right)) {
      return false;
    }

    left = left + 1;
    right = right - 1;
  }

  return true;
}

function longestSubstringWithoutRepeating(str: string): string {
  let start = 0;
  let bestStart = 0;
  let bestLength = 0;

  const lastSeen = new Map<string, number>();

  for (let end = 0; end < str.length; end++) {
    const char = str[end];

    if (lastSeen.has(char) && lastSeen.get(char)! >= start) {
      start = lastSeen.get(char)! + 1;
    }

    lastSeen.set(char, end);

    const currentLength = end - start + 1;

    if (currentLength > bestLength) {
      bestLength = currentLength;
      bestStart = start;
    }
  }

  return str.slice(bestStart, bestStart + bestLength);
}

function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }

    seen.set(nums[i], i);
  }

  return [];
}
