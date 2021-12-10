// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface IAttackLog {
  struct AttackLog {
    uint8 attacker; // 0 for user, 1 for monster
    uint8 dealtDamage; // if 0, miss
    uint8 remainingUserHealth;
    uint8 remainingMonsterHealth;
  }   
} 