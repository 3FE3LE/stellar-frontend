"use client";

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RuleInterface } from '@/core/interfaces';
import { updateRule } from '@/integration/actions/RuleActions';
import { RuleAdapter } from '@/integration/adapters';
import { createGlobalHooks, createRuleHooks } from '@/integration/hooks';
import { useRuleStore } from '@/store/RuleStore';

export default function DynamicPricingRules() {
  const { setEditingRule, editingRule } = useRuleStore();

  const handleEditRule = (rule: RuleInterface) => {
    setEditingRule(rule);
  };

  const handleUpdateRule = async () => {
    if (editingRule) {
      await createGlobalHooks<RuleInterface>("/rules").useAction(updateRule, [
        editingRule.id,
        editingRule,
      ]);
      setEditingRule(null);
    }
  };

  const { useRules } = createRuleHooks(RuleAdapter);

  const { results: rules, isLoading, isError } = useRules();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Pricing Rules</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rule Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules &&
            rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>{rule.ruleType}</TableCell>
                <TableCell>{rule.value}</TableCell>
                <TableCell>{rule.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleEditRule(rule)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingRule} onOpenChange={() => setEditingRule(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Rule</DialogTitle>
            <DialogDescription>
              Make changes to the pricing rule
            </DialogDescription>
          </DialogHeader>
          {editingRule && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Value
                </Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={editingRule.value}
                  onChange={(e) =>
                    setEditingRule({
                      ...editingRule,
                      value: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={editingRule.description}
                  onChange={(e) =>
                    setEditingRule({
                      ...editingRule,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingRule(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRule}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
